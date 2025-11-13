"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle2,
    Sparkles,
    Target,
    TrendingUp,
    Wind,
} from "lucide-react";
import Link from "next/link";

const floatingIcons = [
  { Icon: Calendar, delay: 0, duration: 3 },
  { Icon: Target, delay: 0.5, duration: 3.5 },
  { Icon: TrendingUp, delay: 1, duration: 4 },
  { Icon: CheckCircle2, delay: 1.5, duration: 3.2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--zephyr-dark))] via-background to-[hsl(var(--zephyr-deep))] opacity-30" />
      
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map(({ Icon, delay, duration }, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/10"
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 20}%`,
            }}
          >
            <Icon className="w-16 h-16 md:w-24 md:h-24" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Breeze through every part of your life
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[hsl(var(--zephyr-primary))] via-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-light))] bg-clip-text text-transparent">
              ZephyrDo
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl"
          >
            The only task manager that helps you organize your{" "}
            <span className="text-primary font-semibold">entire life flow</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl"
          >
            Personal · Work · Study · Finance · Goals · Habits — All in one place,
            beautifully synced, even offline.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))] hover:opacity-90 shadow-lg shadow-primary/25"
              >
                <Wind className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 md:gap-16"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                8+
              </div>
              <div className="text-sm text-muted-foreground">Life Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Offline Ready</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                ∞
              </div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
