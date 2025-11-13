import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
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

          <ForgotPasswordForm />
        </div>
      </div>

      {/* Right Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-deep))] via-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (32).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Don&apos;t Worry, We&apos;ve Got You
            </h2>
            <p className="text-lg text-white/90">
              Resetting your password is quick and easy. You&apos;ll be back to organizing your life in no time.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🔐</div>
                <div>
                  <div className="font-semibold">Secure Recovery</div>
                  <div className="text-sm text-white/80">We&apos;ll send a secure link to your email</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
