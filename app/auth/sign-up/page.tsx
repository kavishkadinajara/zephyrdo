import { SignUpForm } from "@/components/sign-up-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-primary))] via-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-light))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (14).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Start Your Journey to an Organized Life
            </h2>
            <p className="text-lg text-white/90">
              Join thousands who breeze through their daily tasks, goals, and dreams with ZephyrDo.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-1">✨</div>
                <div className="font-semibold">Smart Tasks</div>
                <div className="text-sm text-white/80">AI-powered organization</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl mb-1">🔒</div>
                <div className="font-semibold">Secure & Private</div>
                <div className="text-sm text-white/80">Your data, protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
