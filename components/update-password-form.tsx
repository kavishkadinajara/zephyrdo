"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long for security");
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)/.test(password)) {
      setError("For better security, use a mix of uppercase, lowercase letters, and numbers");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        // User-friendly error messages
        if (error.message.includes("same as the old password")) {
          throw new Error("Your new password must be different from your previous password.");
        } else if (error.message.includes("Password should be")) {
          throw new Error("Password is too weak. Please use a stronger password with a mix of letters, numbers, and symbols.");
        } else if (error.message.includes("not authenticated")) {
          throw new Error("Your session has expired. Please request a new password reset link.");
        } else if (error.message.includes("invalid")) {
          throw new Error("Password reset link is invalid or has expired. Please request a new one.");
        } else {
          throw new Error(error.message);
        }
      }
      
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to update password. Please try again or request a new reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">New Password</h1>
        <p className="text-muted-foreground">
          Enter your new password below
        </p>
      </div>
      
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={cn(
                    "h-11",
                    error && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  Use 6+ characters with a mix of uppercase, lowercase, and numbers
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
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
