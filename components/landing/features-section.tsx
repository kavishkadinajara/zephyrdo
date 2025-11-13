"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    BarChart3,
    Bell,
    Brain,
    Briefcase,
    Calendar,
    DollarSign,
    GraduationCap,
    Palette,
    Target,
    User,
    Wifi,
    WifiOff,
    Zap,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Daily Tasks",
    description: "Quick todos for your everyday life",
    gradient: "from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))]",
  },
  {
    icon: Briefcase,
    title: "Office & Work",
    description: "Priority tasks, deadlines, and sub-tasks",
    gradient: "from-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-light))]",
  },
  {
    icon: User,
    title: "Personal Growth",
    description: "Health, family, and personal reminders",
    gradient: "from-[hsl(var(--zephyr-deep))] to-[hsl(var(--zephyr-primary))]",
  },
  {
    icon: GraduationCap,
    title: "School & University",
    description: "Assignments, exams, notes, and schedules",
    gradient: "from-[hsl(var(--zephyr-light))] to-[hsl(var(--zephyr-medium))]",
  },
  {
    icon: Target,
    title: "Goal Boards",
    description: "Track yearly goals with progress",
    gradient: "from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-deep))]",
  },
  {
    icon: DollarSign,
    title: "Finance Tracker",
    description: "Daily budget and spending logs",
    gradient: "from-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-primary))]",
  },
  {
    icon: Wifi,
    title: "Online Sync",
    description: "Seamless cloud synchronization",
    gradient: "from-[hsl(var(--zephyr-deep))] to-[hsl(var(--zephyr-light))]",
  },
  {
    icon: WifiOff,
    title: "Offline Mode",
    description: "Works perfectly without internet",
    gradient: "from-[hsl(var(--zephyr-light))] to-[hsl(var(--zephyr-deep))]",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description: "Productivity stats and focus ratio",
    gradient: "from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-medium))]",
  },
  {
    icon: Brain,
    title: "AI Assistant",
    description: "Smart task suggestions based on habits",
    gradient: "from-[hsl(var(--zephyr-medium))] to-[hsl(var(--zephyr-light))]",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Email and push notifications",
    gradient: "from-[hsl(var(--zephyr-deep))] to-[hsl(var(--zephyr-primary))]",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Dark mode with breeze animations",
    gradient: "from-[hsl(var(--zephyr-light))] to-[hsl(var(--zephyr-medium))]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need,{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--zephyr-primary))] to-[hsl(var(--zephyr-light))] bg-clip-text text-transparent">
              All in One Place
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ZephyrDo goes beyond traditional todo apps. It&apos;s your complete life
            organization system.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground flex-grow">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
