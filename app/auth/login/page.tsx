import { LoginForm } from "@/components/login-form";
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

          <LoginForm />
        </div>
      </div>

      {/* Right Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-dark))] via-[hsl(var(--zephyr-deep))] to-[hsl(var(--zephyr-primary))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (13).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Welcome Back to Your Organized Life
            </h2>
            <p className="text-lg text-white/90">
              Continue managing your tasks, goals, and dreams. Your productivity journey awaits.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm text-white/80">Life Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-white/80">Offline Ready</div>
              </div>
              <div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm text-white/80">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
