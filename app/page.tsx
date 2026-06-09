"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Target, TrendingUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Animated skill node for hero section
function AnimatedSkillNode({ 
  x, 
  y, 
  delay, 
  label, 
  status 
}: { 
  x: number
  y: number
  delay: number
  label: string
  status: "completed" | "learning" | "locked"
}) {
  const colors = {
    completed: "bg-blue-500 border-blue-400",
    learning: "bg-blue-400/50 border-blue-400",
    locked: "bg-gray-700 border-gray-600",
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute w-12 h-12 rounded-xl ${colors[status]} border-2 flex items-center justify-center text-xs font-medium text-white shadow-lg`}
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {label}
    </motion.div>
  )
}

// Animated connection line
function AnimatedLine({ 
  x1, 
  y1, 
  x2, 
  y2, 
  delay 
}: { 
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}) {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="#3B82F6"
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.5 }}
      transition={{ delay, duration: 0.8 }}
    />
  )
}

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/80 backdrop-blur-xl border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-sm">
              Fx
            </div>
            <span className="text-xl font-bold">FindX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/skill-tree">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                Skill Tree
              </Button>
            </Link>
            <Link href="/drill">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                Drill
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                Profile
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Gamified Math Learning
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Discover What You Need{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  To Learn Next.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Master mathematics through personalized skill trees, adaptive drills, and prerequisite learning paths.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/skill-tree">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Learning
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.span>
                </Button>
              </Link>
              <Link href="/skill-tree">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-white/5 px-8 py-6 text-lg rounded-xl"
                >
                  Explore Skill Tree
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-8 pt-4"
            >
              <div>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm text-gray-500">Math Skills</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">1000+</p>
                <p className="text-sm text-gray-500">Practice Problems</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Animated Skill Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] rounded-2xl bg-gradient-to-br from-[#111827] to-[#0B1220] border border-[#1F2937] overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              <AnimatedLine x1={50} y1={15} x2={30} y2={35} delay={0.5} />
              <AnimatedLine x1={50} y1={15} x2={70} y2={35} delay={0.6} />
              <AnimatedLine x1={30} y1={35} x2={25} y2={55} delay={0.8} />
              <AnimatedLine x1={30} y1={35} x2={45} y2={55} delay={0.9} />
              <AnimatedLine x1={70} y1={35} x2={55} y2={55} delay={1.0} />
              <AnimatedLine x1={70} y1={35} x2={75} y2={55} delay={1.1} />
              <AnimatedLine x1={25} y1={55} x2={30} y2={75} delay={1.3} />
              <AnimatedLine x1={45} y1={55} x2={50} y2={75} delay={1.4} />
              <AnimatedLine x1={75} y1={55} x2={70} y2={75} delay={1.5} />
            </svg>

            {/* Skill nodes */}
            <AnimatedSkillNode x={50} y={15} delay={0.3} label="Math" status="completed" />
            <AnimatedSkillNode x={30} y={35} delay={0.5} label="Alg" status="completed" />
            <AnimatedSkillNode x={70} y={35} delay={0.6} label="Geo" status="learning" />
            <AnimatedSkillNode x={25} y={55} delay={0.8} label="Lin" status="learning" />
            <AnimatedSkillNode x={45} y={55} delay={0.9} label="Quad" status="locked" />
            <AnimatedSkillNode x={55} y={55} delay={1.0} label="Trig" status="locked" />
            <AnimatedSkillNode x={75} y={55} delay={1.1} label="Area" status="locked" />
            <AnimatedSkillNode x={30} y={75} delay={1.3} label="Sys" status="locked" />
            <AnimatedSkillNode x={50} y={75} delay={1.4} label="Fact" status="locked" />
            <AnimatedSkillNode x={70} y={75} delay={1.5} label="Vol" status="locked" />

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-500"
            >
              <span>Interactive Skill Graph</span>
              <span>Click to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#111827]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why FindX?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A revolutionary approach to learning mathematics, designed for the modern learner.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Prerequisite Learning",
                description: "Never skip a step. Our skill tree ensures you master fundamentals before advancing.",
              },
              {
                icon: Zap,
                title: "Adaptive Drills",
                description: "Practice problems that adapt to your skill level and learning pace.",
              },
              {
                icon: TrendingUp,
                title: "Track Progress",
                description: "Visualize your journey with detailed stats, streaks, and achievements.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-blue-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to master mathematics?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of students who are learning smarter, not harder.
            </p>
            <Link href="/skill-tree">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl">
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-xs">
              Fx
            </div>
            <span className="font-semibold">FindX</span>
          </div>
          <p className="text-sm text-gray-500">
            A gamified mathematics learning platform.
          </p>
        </div>
      </footer>
    </div>
  )
}
