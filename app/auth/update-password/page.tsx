import { UpdatePasswordForm } from "@/components/update-password-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-[hsl(var(--zephyr-light))] via-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-primary))]">
        <div className="absolute inset-0 bg-black/20" />
        <Image
          src="/banar/Image_fx (33).jpg"
          alt="ZephyrDo Banner"
          fill
          className="object-cover mix-blend-overlay opacity-50"
          priority
        />
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight">
              Create a Strong New Password
            </h2>
            <p className="text-lg text-white/90">
              Choose a secure password to protect your tasks, goals, and personal information.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">✓</div>
                <span>At least 8 characters long</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">✓</div>
                <span>Mix of letters, numbers & symbols</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">✓</div>
                <span>Unique to this account</span>
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

          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
