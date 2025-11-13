import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/protected";

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, error_description);
    
    let errorMessage = "Authentication failed. Please try again.";
    
    if (error === "access_denied") {
      errorMessage = "You cancelled the sign-in process. Please try again if you'd like to continue.";
    } else if (error_description?.includes("already registered")) {
      errorMessage = "This email is already associated with an account. Please log in instead.";
    }
    
    return NextResponse.redirect(
      `${origin}/auth/error?message=${encodeURIComponent(errorMessage)}`
    );
  }

  // Exchange code for session
  if (code) {
    try {
      const supabase = await createClient();
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!exchangeError) {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
      
      console.error("Session exchange error:", exchangeError);
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(
          "Unable to complete sign-in. Please try again or contact support if the issue persists."
        )}`
      );
    } catch (err) {
      console.error("Unexpected error during auth callback:", err);
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(
          "An unexpected error occurred. Please try again."
        )}`
      );
    }
  }

  // No code provided
  return NextResponse.redirect(
    `${origin}/auth/error?message=${encodeURIComponent(
      "Invalid authentication request. Please start the sign-in process again."
    )}`
  );
}
