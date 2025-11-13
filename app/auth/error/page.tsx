/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  
  // Determine user-friendly error message
  const displayMessage = params?.message || 
    (params?.error === "access_denied" 
      ? "You cancelled the authentication process" 
      : params?.error || "An unexpected error occurred during authentication");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Error Message */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <Image
              src="/logo/logoz.png"
              alt="ZephyrDo Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-light))] bg-clip-text text-transparent">
              ZephyrDo
            </span>
          </Link>

          <div className="flex flex-col gap-6">
            <Card className="border-destructive/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl">
                  Authentication Error
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 rounded-lg p-4">
                  <p className="text-sm text-destructive">
                    {displayMessage}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-semibold text-sm">What you can do:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span><strong className="text-foreground">Try again:</strong> The issue might be temporary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span><strong className="text-foreground">Check your email:</strong> Make sure you're using the correct address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span><strong className="text-foreground">Clear cache:</strong> Try clearing your browser cache and cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span><strong className="text-foreground">Different method:</strong> If using Google, try email/password instead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                      <span><strong className="text-foreground">Disable blockers:</strong> Turn off popup blockers and ad blockers</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <Link href="/auth/login" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))] hover:opacity-90">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </Link>
                </div>
                
                <p className="text-xs text-muted-foreground text-center pt-2">
                  Still having issues? Contact our support team for help.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-deep))] via-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (35).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              We&apos;re Here to Help
            </h2>
            <p className="text-lg text-white/90">
              Don&apos;t worry! Technical issues happen. We&apos;re here to get you back on track quickly.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💬</div>
                <div>
                  <div className="font-semibold">Need Assistance?</div>
                  <div className="text-sm text-white/80">Our support team is ready to help you anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
