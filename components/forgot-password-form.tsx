"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      
      if (error) {
        // User-friendly error messages
        if (error.message.includes("not found")) {
          throw new Error("No account found with this email address. Please check your email or sign up.");
        } else if (error.message.includes("too many requests")) {
          throw new Error("Too many reset attempts. Please wait 60 seconds before trying again.");
        } else if (error.message.includes("rate limit")) {
          throw new Error("Please wait a moment before requesting another password reset.");
        } else {
          throw new Error(error.message);
        }
      }
      
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to send reset email. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Check Your Email</h1>
            <p className="text-muted-foreground">
              Password reset instructions sent
            </p>
          </div>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-4xl mb-3">📧</div>
                <p className="text-sm text-muted-foreground">
                  If you registered using your email and password, you will receive
                  a password reset email shortly.
                </p>
              </div>
              <Link href="/auth/login" className="block mt-6">
                <Button variant="outline" className="w-full h-11">
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground">
              We&apos;ll send you a link to reset your password
            </p>
          </div>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleForgotPassword}>
                <div className="flex flex-col gap-6">
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
                        error && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll send a password reset link to this address
                    </p>
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
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
                <div className="mt-6 text-center text-sm">
                  Remember your password?{" "}
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
        </>
      )}
    </div>
  );
}
