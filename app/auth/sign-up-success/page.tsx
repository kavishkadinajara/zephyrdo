import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Success Message */}
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
            <Card className="border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">
                  Welcome to ZephyrDo! 🎉
                </CardTitle>
                <CardDescription className="text-base">
                  Thank you for signing up!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 flex gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Check your email</p>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ve sent you a confirmation email. Please click the link inside to verify your account.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-semibold text-sm">What&apos;s next?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Verify your email address
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Set up your first task categories
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Start organizing your life
                    </li>
                  </ul>
                </div>

                <Link href="/auth/login" className="block pt-4">
                  <Button className="w-full bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))]">
                    Go to Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-primary))] via-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-light))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (34).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Your Journey Begins Now! 
            </h2>
            <p className="text-lg text-white/90">
              Get ready to breeze through your tasks, achieve your goals, and live your best organized life.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold">Smart Goals</div>
                <div className="text-sm text-white/80">Track & achieve them</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-semibold">Quick Tasks</div>
                <div className="text-sm text-white/80">Done in seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
