"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Trophy, Flame, Medal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Leaderboard data
const leaderboardData = [
  { rank: 1, name: "Wemby", avatar: "", xp: 98750, streak: 156 },
  { rank: 2, name: "Kyrie", avatar: "", xp: 87420, streak: 89 },
  { rank: 3, name: "Stephon Castle", avatar: "", xp: 76890, streak: 67 },
  { rank: 4, name: "Marty Mauser", avatar: "", xp: 65430, streak: 54 },
  { rank: 5, name: "Zohran Mamdani", avatar: "", xp: 54210, streak: 42 },
  { rank: 6, name: "Kobe", avatar: "", xp: 48760, streak: 38 },
  { rank: 7, name: "Rafa", avatar: "", xp: 24750, streak: 47, isCurrentUser: true },
  { rank: 8, name: "Timothee", avatar: "", xp: 23100, streak: 21 },
  { rank: 9, name: "Robpat", avatar: "", xp: 19870, streak: 15 },
  { rank: 10, name: "Subaru", avatar: "", xp: 17650, streak: 12 },
]

// Rank badge component
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
        <Trophy className="w-5 h-5 text-yellow-900" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
        <Medal className="w-5 h-5 text-gray-800" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
        <Medal className="w-5 h-5 text-amber-200" />
      </div>
    )
  }
  return (
    <div className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center">
      <span className="font-bold text-gray-400">{rank}</span>
    </div>
  )
}

export default function LeaderboardPage() {
  const top3 = leaderboardData.slice(0, 3)
  const rest = leaderboardData.slice(3)

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111827] border-b border-[#1F2937] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Leaderboard</h1>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Top 3 Podium */}
          <div className="mb-8">
            <div className="flex items-end justify-center gap-4 pt-8">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <Avatar className="w-16 h-16 border-4 border-gray-400 mb-2">
                  <AvatarImage src={top3[1]?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-xl font-bold">
                    {top3[1]?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sm mb-1">{top3[1]?.name}</p>
                <p className="text-xs text-gray-400 mb-2">{top3[1]?.xp.toLocaleString()} XP</p>
                <div className="w-20 h-20 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-200">2</span>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center -mt-8"
              >
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-yellow-400 mb-2">
                    <AvatarImage src={top3[0]?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-2xl font-bold">
                      {top3[0]?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Trophy className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-yellow-400" />
                </div>
                <p className="font-semibold mb-1">{top3[0]?.name}</p>
                <p className="text-xs text-gray-400 mb-2">{top3[0]?.xp.toLocaleString()} XP</p>
                <div className="w-24 h-28 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-yellow-900">1</span>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <Avatar className="w-16 h-16 border-4 border-amber-600 mb-2">
                  <AvatarImage src={top3[2]?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-xl font-bold">
                    {top3[2]?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sm mb-1">{top3[2]?.name}</p>
                <p className="text-xs text-gray-400 mb-2">{top3[2]?.xp.toLocaleString()} XP</p>
                <div className="w-20 h-16 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-200">3</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Rest of Leaderboard */}
          <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#1F2937] text-sm text-gray-500">
              <div className="col-span-1">Rank</div>
              <div className="col-span-6">Student</div>
              <div className="col-span-3 text-right">XP</div>
              <div className="col-span-2 text-right">Streak</div>
            </div>

            {/* Table Rows */}
            {rest.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-[#1F2937] last:border-0",
                  user.isCurrentUser && "bg-blue-500/10"
                )}
              >
                <div className="col-span-1">
                  <RankBadge rank={user.rank} />
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={cn("font-medium", user.isCurrentUser && "text-blue-400")}>
                      {user.name}
                      {user.isCurrentUser && " (You)"}
                    </p>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-semibold text-yellow-400">
                    {user.xp.toLocaleString()}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    {user.streak}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
