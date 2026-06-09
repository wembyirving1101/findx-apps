"use client"

import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Share2, 
  Heart,
  Scroll,
  Flame,
  Moon,
  Percent
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// User profile data
const userProfile = {
  name: "Rafa",
  avatar: "/avatars/rafa.png",
  level: 97,
  likes: 97,
  rank: "Scholar I",
  currentCourse: "Calculus II",
  bestCourse: "Linear Algebra III",
}

// Achievements data
const achievements = [
  {
    id: 1,
    name: "On Fire I",
    icon: Flame,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: 2,
    name: "Insomniac II",
    icon: Moon,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: 3,
    name: "Mr. 100%",
    icon: Percent,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111827] border-b border-[#1F2937] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Large Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border-b border-[#1F2937] flex items-center justify-center py-12"
        >
          <Avatar className="w-40 h-40 border-4 border-[#1F2937]">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-5xl font-bold">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name, Level, Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111827] border-b border-[#1F2937] px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-gray-400">Level {userProfile.level}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-1">
                <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                <span className="text-gray-400">{userProfile.likes}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rank and Course Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111827] border-b border-[#1F2937] px-6 py-6"
        >
          <div className="flex gap-6">
            {/* Rank Badge */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1F2937] border-2 border-[#374151] flex items-center justify-center mb-2">
                <Scroll className="w-10 h-10 text-amber-400" />
              </div>
              <span className="text-sm text-gray-400">{userProfile.rank}</span>
            </div>

            {/* Course Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Course</p>
                <div className="bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-2">
                  <span className="text-white">{userProfile.currentCourse}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Best Course</p>
                <div className="bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-2">
                  <span className="text-white">{userProfile.bestCourse}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111827] px-6 py-6"
        >
          <div className="flex justify-center gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-20 h-20 rounded-full ${achievement.bgColor} border-2 ${achievement.borderColor} flex items-center justify-center mb-2`}
                >
                  <achievement.icon className={`w-10 h-10 ${achievement.color}`} />
                </div>
                <span className="text-sm text-gray-400 text-center">{achievement.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
