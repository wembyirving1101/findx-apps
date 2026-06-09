"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Skill node types
type SkillStatus = "completed" | "learning" | "locked"

interface SkillNode {
  id: string
  title: string
  formula: string
  status: SkillStatus
  children?: string[]
  x: number
  y: number
}

// Skill tree data matching the image design (Indonesian math topics)
const skillNodes: Record<string, SkillNode> = {
  bilangan: {
    id: "bilangan",
    title: "Bilangan",
    formula: "ℝ",
    status: "completed",
    children: ["aljabar", "eksponen"],
    x: 200,
    y: 80,
  },
  geometri: {
    id: "geometri",
    title: "Geometri",
    formula: "△○□",
    status: "learning",
    children: [],
    x: 340,
    y: 80,
  },
  aljabar: {
    id: "aljabar",
    title: "Aljabar",
    formula: "a + b",
    status: "locked",
    children: ["persamaan-linear", "persamaan-kuadrat"],
    x: 140,
    y: 200,
  },
  eksponen: {
    id: "eksponen",
    title: "Eksponen & Akar",
    formula: "√a²",
    status: "learning",
    children: ["statistik"],
    x: 300,
    y: 200,
  },
  "persamaan-linear": {
    id: "persamaan-linear",
    title: "Persamaan Linear",
    formula: "ax + b = c",
    status: "locked",
    children: ["sistem-persamaan"],
    x: 80,
    y: 330,
  },
  "persamaan-kuadrat": {
    id: "persamaan-kuadrat",
    title: "Persamaan Kuadrat",
    formula: "ax² + bx + c = 0",
    status: "locked",
    children: ["fungsi-kuadrat"],
    x: 220,
    y: 330,
  },
  statistik: {
    id: "statistik",
    title: "Statistik I",
    formula: "📊",
    status: "locked",
    children: ["statistik-2"],
    x: 360,
    y: 330,
  },
  "sistem-persamaan": {
    id: "sistem-persamaan",
    title: "Sistem Persamaan",
    formula: "x + y = n",
    status: "locked",
    children: [],
    x: 80,
    y: 460,
  },
  "fungsi-kuadrat": {
    id: "fungsi-kuadrat",
    title: "Fungsi Kuadrat",
    formula: "f(x) = x²",
    status: "locked",
    children: [],
    x: 220,
    y: 460,
  },
  "statistik-2": {
    id: "statistik-2",
    title: "Statistik II",
    formula: "σ, μ",
    status: "locked",
    children: [],
    x: 360,
    y: 460,
  },
}

// Connection lines between nodes
const connections: [string, string][] = [
  ["bilangan", "aljabar"],
  ["bilangan", "eksponen"],
  ["aljabar", "persamaan-linear"],
  ["aljabar", "persamaan-kuadrat"],
  ["eksponen", "statistik"],
  ["persamaan-linear", "sistem-persamaan"],
  ["persamaan-kuadrat", "fungsi-kuadrat"],
  ["statistik", "statistik-2"],
]

// Node card component
function SkillCard({
  node,
  isHighlighted,
  isSearched,
  onClick,
}: {
  node: SkillNode
  isHighlighted: boolean
  isSearched: boolean
  onClick: () => void
}) {
  const statusColors = {
    completed: {
      header: "bg-green-500",
      headerText: "text-white",
      border: "border-green-500/50",
      glow: "shadow-green-500/20",
    },
    learning: {
      header: "bg-yellow-500",
      headerText: "text-white",
      border: "border-yellow-500/50",
      glow: "shadow-yellow-500/20",
    },
    locked: {
      header: "bg-[#1F2937]",
      headerText: "text-gray-400",
      border: "border-[#1F2937]",
      glow: "",
    },
  }

  const colors = statusColors[node.status]

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "absolute cursor-pointer transition-all duration-300",
        isHighlighted || isSearched ? "z-20" : "z-10",
        !isHighlighted && !isSearched && "opacity-40"
      )}
      style={{
        left: node.x,
        top: node.y,
        transform: "translate(-50%, 0)",
      }}
    >
      <div
        className={cn(
          "w-28 rounded-xl border bg-[#111827] shadow-lg transition-all overflow-hidden",
          colors.border,
          colors.glow && `shadow-lg ${colors.glow}`,
          isSearched && "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0B1220]",
          isHighlighted && !isSearched && "ring-1 ring-blue-400/50"
        )}
      >
        {/* Header with title */}
        <div className={cn("px-2 py-1.5 text-center", colors.header)}>
          <span className={cn("text-xs font-semibold leading-tight block truncate", colors.headerText)}>
            {node.title}
          </span>
        </div>
        {/* Formula section */}
        <div className="px-2 py-3 text-center bg-[#111827]">
          <span className="text-lg font-mono text-white">{node.formula}</span>
        </div>
      </div>
    </motion.div>
  )
}

// SVG connection lines
function ConnectionLines({
  highlightedPath,
}: {
  highlightedPath: string[]
}) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {connections.map(([fromId, toId]) => {
        const from = skillNodes[fromId]
        const to = skillNodes[toId]
        if (!from || !to) return null

        const isHighlighted =
          highlightedPath.includes(fromId) && highlightedPath.includes(toId)

        // Calculate line positions
        const x1 = from.x
        const y1 = from.y + 70 // Bottom of card
        const x2 = to.x
        const y2 = to.y // Top of card

        return (
          <g key={`${fromId}-${toId}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isHighlighted ? "#3B82F6" : "#374151"}
              strokeWidth={isHighlighted ? 3 : 2}
              strokeLinecap="round"
            />
          </g>
        )
      })}
    </svg>
  )
}

// Dotted grid background
function DottedGrid() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle, #374151 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  )
}

export default function SkillTreePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [highlightedPath, setHighlightedPath] = useState<string[]>([])

  // Find prerequisites path for a node
  const findPrerequisitePath = useCallback((nodeId: string): string[] => {
    const path: string[] = [nodeId]
    
    // Find parent nodes
    const findParents = (id: string) => {
      for (const [parentId, parent] of Object.entries(skillNodes)) {
        if (parent.children?.includes(id) && !path.includes(parentId)) {
          path.unshift(parentId)
          findParents(parentId)
        }
      }
    }
    
    findParents(nodeId)
    return path
  }, [])

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const matchedNode = Object.values(skillNodes).find(
        (node) =>
          node.title.toLowerCase().includes(query.toLowerCase()) ||
          node.formula.toLowerCase().includes(query.toLowerCase())
      )
      if (matchedNode) {
        setSelectedNode(matchedNode.id)
        setHighlightedPath(findPrerequisitePath(matchedNode.id))
      } else {
        setSelectedNode(null)
        setHighlightedPath([])
      }
    } else {
      setSelectedNode(null)
      setHighlightedPath(Object.keys(skillNodes))
    }
  }

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
    setHighlightedPath(findPrerequisitePath(nodeId))
    setSearchQuery(skillNodes[nodeId].title)
  }

  // Initialize with all nodes highlighted
  const displayedPath = highlightedPath.length > 0 ? highlightedPath : Object.keys(skillNodes)

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111827] border-b border-[#1F2937] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Skill Tree</h1>
        </div>
      </header>

      {/* Legend */}
      <div className="bg-[#111827] border-b border-[#1F2937] px-4 py-2">
        <div className="max-w-lg mx-auto flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm text-gray-400">Learning</span>
          </div>
        </div>
      </div>

      {/* Skill Tree Canvas */}
      <div className="flex-1 relative overflow-auto">
        <div className="relative min-h-[600px] w-full max-w-lg mx-auto">
          <DottedGrid />
          <ConnectionLines highlightedPath={displayedPath} />
          
          {/* Skill nodes */}
          {Object.values(skillNodes).map((node) => (
            <SkillCard
              key={node.id}
              node={node}
              isHighlighted={displayedPath.includes(node.id)}
              isSearched={selectedNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}

          {/* ETC indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[540px] text-gray-600 text-2xl italic">
            ETC...
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky bottom-0 bg-[#111827] border-t border-[#1F2937] px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[#0B1220] border-[#1F2937] text-white placeholder:text-gray-500 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
