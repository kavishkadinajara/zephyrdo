"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Please create a password");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match. Please make sure both passwords are identical.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      
      if (error) {
        // User-friendly error messages
        if (error.message.includes("already registered")) {
          throw new Error("This email is already registered. Please log in instead or use a different email.");
        } else if (error.message.includes("Password should be")) {
          throw new Error("Password is too weak. Please use a stronger password with a mix of letters, numbers, and symbols.");
        } else if (error.message.includes("invalid email")) {
          throw new Error("This email address is not valid. Please check and try again.");
        } else if (error.message.includes("too many requests")) {
          throw new Error("Too many sign-up attempts. Please wait a few minutes and try again.");
        } else {
          throw new Error(error.message);
        }
      }
      
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to create account. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const supabase = createClient();
    setError(null);

    try {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      const callback = `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callback,
        },
      });
      
      if (error) {
        // User-friendly OAuth error messages
        if (error.message.includes("popup")) {
          throw new Error("Unable to open sign-up window. Please check your popup blocker settings.");
        } else if (error.message.includes("network")) {
          throw new Error("Network error. Please check your internet connection and try again.");
        } else {
          throw new Error("Unable to connect with Google. Please try again.");
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Google sign-up failed. Please try again or use email registration.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">
          Sign up to start organizing your life
        </p>
      </div>
      
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              {/* Google Sign Up Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border/50 hover:bg-muted"
                onClick={handleGoogleSignUp}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "h-11",
                    error && error.toLowerCase().includes("email") && "border-destructive focus-visible:ring-destructive"
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "h-11",
                    error && error.toLowerCase().includes("password") && !error.toLowerCase().includes("match") && "border-destructive focus-visible:ring-destructive"
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password">Confirm Password</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "h-11",
                    error && error.toLowerCase().includes("match") && "border-destructive focus-visible:ring-destructive"
                  )}
                />
              </div>
              {error && (
                <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm p-3.5 rounded-lg flex items-start gap-2.5 animate-in fade-in-50 slide-in-from-top-1">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="flex-1 leading-relaxed">{error}</span>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))] hover:opacity-90" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
