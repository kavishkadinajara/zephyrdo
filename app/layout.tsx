import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ZephyrDo - Breeze Through Every Part of Your Life",
  description: "The only task manager that helps you organize your entire life flow. Personal, Work, Study, Finance, Goals & Habits - All in one place.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed Modern Background */}
          <div className="fixed inset-0 -z-10">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(var(--zephyr-dark))] opacity-80" />
            
            {/* Animated Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[hsl(var(--zephyr-primary))] to-transparent rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[hsl(var(--zephyr-medium))] to-transparent rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-[hsl(var(--zephyr-light))] to-transparent rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Mesh Gradient Pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--zephyr-primary)) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 80%, hsl(var(--zephyr-medium)) 0%, transparent 50%),
                                  radial-gradient(circle at 40% 20%, hsl(var(--zephyr-light)) 0%, transparent 50%)`,
                backgroundSize: '100% 100%',
                backgroundPosition: '0% 0%',
              }}
            />
            
            {/* Noise Texture for Modern Look */}
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Content with backdrop blur */}
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
