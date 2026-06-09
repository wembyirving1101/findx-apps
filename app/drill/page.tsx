"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Heart, Pencil, Eraser, RotateCcw, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"

// ============================================
// EQUATION BLUEPRINTS & GENERATORS
// ============================================

type AnswerMode = "multiple-choice" | "text-input"

interface GeneratedQuestion {
  id: string
  questionText: string
  correctAnswer: number | string
  choices?: (number | string)[]
  answerMode: AnswerMode
  skill: string
  hint: string
}

// Blueprint: Linear equation ax + b = 0, answer = -b/a
function generateLinearEquation(): GeneratedQuestion {
  const a = randomInt(1, 10) * randomSign()
  const b = randomInt(1, 20) * randomSign()
  const answer = -b / a
  
  // Only use this if answer is a nice integer
  if (!Number.isInteger(answer)) {
    return generateLinearEquation()
  }
  
  const questionText = formatLinearEquation(a, b)
  // 70% multiple-choice, 30% text-input
  const answerMode = Math.random() > 0.3 ? "multiple-choice" : "text-input"
  
  return {
    id: crypto.randomUUID(),
    questionText: `Solve for x: ${questionText} = 0`,
    correctAnswer: answer,
    choices: answerMode === "multiple-choice" ? generateChoices(answer) : undefined,
    answerMode,
    skill: "Linear Equations",
    hint: "Isolate x by moving constants to the other side",
  }
}

// Blueprint: Quadratic equation x² + bx + c = 0 (factorable)
function generateQuadraticEquation(): GeneratedQuestion {
  // Generate from roots: (x - r1)(x - r2) = x² - (r1+r2)x + r1*r2
  const r1 = randomInt(-10, 10)
  const r2 = randomInt(-10, 10)
  
  const b = -(r1 + r2)
  const c = r1 * r2
  
  const questionText = formatQuadratic(1, b, c)
  // 70% multiple-choice, 30% text-input
  const answerMode = Math.random() > 0.3 ? "multiple-choice" : "text-input"
  
  // For multiple choice, we ask for one root
  const correctAnswer = Math.min(r1, r2)
  
  return {
    id: crypto.randomUUID(),
    questionText: `Find the smallest root: ${questionText} = 0`,
    correctAnswer,
    choices: answerMode === "multiple-choice" ? generateChoices(correctAnswer) : undefined,
    answerMode,
    skill: "Quadratic Equations",
    hint: "Factor the quadratic or use the quadratic formula",
  }
}

// Blueprint: Simple arithmetic a + b, a - b, a * b
function generateArithmetic(): GeneratedQuestion {
  const operations = [
    { op: "+", fn: (a: number, b: number) => a + b },
    { op: "-", fn: (a: number, b: number) => a - b },
    { op: "×", fn: (a: number, b: number) => a * b },
  ]
  const { op, fn } = operations[randomInt(0, operations.length - 1)]
  
  const a = randomInt(1, 20)
  const b = randomInt(1, 20)
  const answer = fn(a, b)
  
  const answerMode = Math.random() > 0.3 ? "multiple-choice" : "text-input"
  
  return {
    id: crypto.randomUUID(),
    questionText: `Calculate: ${a} ${op} ${b}`,
    correctAnswer: answer,
    choices: answerMode === "multiple-choice" ? generateChoices(answer) : undefined,
    answerMode,
    skill: "Arithmetic",
    hint: "Perform the basic operation",
  }
}

// Blueprint: Simplify expression like 3(2x + 4) - 5x
function generateSimplifyExpression(): GeneratedQuestion {
  const a = randomInt(2, 5)
  const b = randomInt(1, 6)
  const c = randomInt(1, 10)
  const d = randomInt(1, 8)
  
  // a(bx + c) - dx = (ab - d)x + ac
  const coeffX = a * b - d
  const constant = a * c
  
  const questionText = `Simplify: ${a}(${b}x + ${c}) - ${d}x`
  const answer = coeffX === 1 ? `x + ${constant}` : coeffX === -1 ? `-x + ${constant}` : `${coeffX}x + ${constant}`
  
  // For simplification, we'll ask what the coefficient of x is (easier to validate)
  const answerMode: AnswerMode = "multiple-choice"
  
  return {
    id: crypto.randomUUID(),
    questionText: `${questionText}\n\nWhat is the coefficient of x?`,
    correctAnswer: coeffX,
    choices: generateChoices(coeffX),
    answerMode,
    skill: "Algebraic Expressions",
    hint: "Distribute first, then combine like terms",
  }
}

// Blueprint: Find slope from y = mx + b
function generateSlopeQuestion(): GeneratedQuestion {
  const m = randomInt(-10, 10)
  const b = randomInt(-10, 10)
  
  const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`
  const questionText = `Find the slope of: y = ${m}x ${bStr}`
  
  // 70% multiple-choice, 30% text-input
  const answerMode = Math.random() > 0.3 ? "multiple-choice" : "text-input"
  
  return {
    id: crypto.randomUUID(),
    questionText,
    correctAnswer: m,
    choices: answerMode === "multiple-choice" ? generateChoices(m) : undefined,
    answerMode,
    skill: "Linear Functions",
    hint: "In y = mx + b, m is the slope",
  }
}

// Blueprint: Percentage calculation
function generatePercentage(): GeneratedQuestion {
  const percent = randomInt(1, 10) * 10 // 10%, 20%, ... 100%
  const base = randomInt(2, 20) * 10 // 20, 30, ... 200
  const answer = (percent / 100) * base
  
  const answerMode: AnswerMode = "multiple-choice"
  
  return {
    id: crypto.randomUUID(),
    questionText: `What is ${percent}% of ${base}?`,
    correctAnswer: answer,
    choices: generateChoices(answer),
    answerMode,
    skill: "Percentages",
    hint: "Multiply the percentage (as decimal) by the number",
  }
}

// Blueprint: Square root
function generateSquareRoot(): GeneratedQuestion {
  const root = randomInt(2, 12)
  const square = root * root
  
  const answerMode: AnswerMode = "multiple-choice"
  
  return {
    id: crypto.randomUUID(),
    questionText: `Calculate: √${square}`,
    correctAnswer: root,
    choices: generateChoices(root),
    answerMode,
    skill: "Roots & Exponents",
    hint: "Find which number multiplied by itself gives the value",
  }
}

// Blueprint: Exponent
function generateExponent(): GeneratedQuestion {
  const base = randomInt(2, 6)
  const exp = randomInt(2, 4)
  const answer = Math.pow(base, exp)
  
  const answerMode: AnswerMode = "multiple-choice"
  
  return {
    id: crypto.randomUUID(),
    questionText: `Calculate: ${base}^${exp}`,
    correctAnswer: answer,
    choices: generateChoices(answer),
    answerMode,
    skill: "Roots & Exponents",
    hint: `Multiply ${base} by itself ${exp} times`,
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1
}

function formatLinearEquation(a: number, b: number): string {
  const aStr = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`
  const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`
  return `${aStr} ${bStr}`
}

function formatQuadratic(a: number, b: number, c: number): string {
  let result = a === 1 ? "x²" : `${a}x²`
  if (b !== 0) {
    result += b > 0 ? ` + ${b === 1 ? "" : b}x` : ` - ${b === -1 ? "" : Math.abs(b)}x`
  }
  if (c !== 0) {
    result += c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`
  }
  return result
}

function generateChoices(correct: number | string): (number | string)[] {
  const correctNum = typeof correct === "string" ? parseFloat(correct) : correct
  const choices = new Set<number>([correctNum])
  
  // Generate 3 wrong answers close to the correct one
  while (choices.size < 4) {
    const offset = randomInt(1, 5) * randomSign()
    const wrong = correctNum + offset
    if (wrong !== correctNum) {
      choices.add(wrong)
    }
  }
  
  // Shuffle the choices
  return Array.from(choices).sort(() => Math.random() - 0.5)
}

// Question generator factory
function generateQuestion(): GeneratedQuestion {
  const generators = [
    generateLinearEquation,
    generateQuadraticEquation,
    generateArithmetic,
    generateSimplifyExpression,
    generateSlopeQuestion,
    generatePercentage,
    generateSquareRoot,
    generateExponent,
  ]
  
  const randomGenerator = generators[randomInt(0, generators.length - 1)]
  return randomGenerator()
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function DrillPage() {
  const [question, setQuestion] = useState<GeneratedQuestion | null>(null)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answer, setAnswer] = useState("")
  const [selectedChoice, setSelectedChoice] = useState<number | string | null>(null)
  const [hearts, setHearts] = useState(5)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [mode, setMode] = useState<"answer" | "scribble">("answer")

  // Generate first question on mount
  useEffect(() => {
    setQuestion(generateQuestion())
  }, [])

  const progress = Math.min((questionsAnswered / 10) * 100, 100)

  const handleSubmit = useCallback(() => {
    if (!question) return

    let isAnswerCorrect = false

    if (question.answerMode === "multiple-choice") {
      isAnswerCorrect = selectedChoice === question.correctAnswer
    } else {
      // Text input - parse and compare
      const userAnswer = parseFloat(answer.trim())
      const correctNum = typeof question.correctAnswer === "number" 
        ? question.correctAnswer 
        : parseFloat(question.correctAnswer)
      isAnswerCorrect = userAnswer === correctNum
    }

    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)
    setQuestionsAnswered(q => q + 1)

    if (isAnswerCorrect) {
      setCorrectAnswers(c => c + 1)
    } else {
      setHearts(h => Math.max(0, h - 1))
    }
  }, [question, selectedChoice, answer])

  const handleNext = useCallback(() => {
    setShowFeedback(false)
    setIsCorrect(null)
    setAnswer("")
    setSelectedChoice(null)
    setQuestion(generateQuestion())
  }, [])

  const handleChoiceSelect = (choice: number | string) => {
    if (!showFeedback) {
      setSelectedChoice(choice)
    }
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  const hasNoMoreHearts = hearts === 0

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#111827] border-b border-[#1F2937] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex-1">
            <Progress value={progress} className="h-3 bg-[#1F2937]" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-semibold text-red-400">{hearts}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 py-8">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          {/* Stats Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              {question.skill}
            </span>
            <span className="text-gray-400 text-sm">
              {correctAnswers}/{questionsAnswered} correct
            </span>
          </div>

          {/* Game Over State */}
          {hasNoMoreHearts ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Out of Hearts!</h2>
              <p className="text-gray-400 mb-2">
                You answered {correctAnswers} out of {questionsAnswered} correctly
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Accuracy: {questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0}%
              </p>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="outline" className="border-[#1F2937] hover:bg-white/10">
                    Back to Home
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setHearts(5)
                    setQuestionsAnswered(0)
                    setCorrectAnswers(0)
                    setQuestion(generateQuestion())
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Question Card */}
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111827] rounded-2xl border border-[#1F2937] p-8 mb-6"
              >
                <p className="text-gray-400 text-sm mb-2">Question:</p>
                <h2 className="text-2xl font-bold font-mono whitespace-pre-line">{question.questionText}</h2>
              </motion.div>

              {/* Answer Mode Tabs */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={mode === "answer" ? "default" : "outline"}
                  onClick={() => setMode("answer")}
                  className={cn(
                    mode === "answer" 
                      ? "bg-blue-500 hover:bg-blue-600" 
                      : "border-[#1F2937] hover:bg-white/10"
                  )}
                >
                  Answer Mode
                </Button>
                <Button
                  variant={mode === "scribble" ? "default" : "outline"}
                  onClick={() => setMode("scribble")}
                  className={cn(
                    mode === "scribble" 
                      ? "bg-blue-500 hover:bg-blue-600" 
                      : "border-[#1F2937] hover:bg-white/10"
                  )}
                >
                  Scribble Mode
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {mode === "answer" ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Multiple Choice Cards */}
                    {question.answerMode === "multiple-choice" && question.choices ? (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {question.choices.map((choice, index) => {
                          const isSelected = selectedChoice === choice
                          const isCorrectChoice = choice === question.correctAnswer
                          const showCorrectHighlight = showFeedback && isCorrectChoice
                          const showWrongHighlight = showFeedback && isSelected && !isCorrectChoice

                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleChoiceSelect(choice)}
                              disabled={showFeedback}
                              whileHover={!showFeedback ? { scale: 1.02 } : {}}
                              whileTap={!showFeedback ? { scale: 0.98 } : {}}
                              className={cn(
                                "p-6 rounded-2xl border-2 text-xl font-mono font-bold transition-all",
                                "bg-[#111827] hover:bg-[#1a2436]",
                                isSelected && !showFeedback && "border-blue-500 bg-blue-500/10",
                                !isSelected && !showFeedback && "border-[#1F2937]",
                                showCorrectHighlight && "border-green-500 bg-green-500/10",
                                showWrongHighlight && "border-red-500 bg-red-500/10",
                                showFeedback && !isCorrectChoice && !isSelected && "opacity-50"
                              )}
                            >
                              <span className={cn(
                                showCorrectHighlight && "text-green-400",
                                showWrongHighlight && "text-red-400"
                              )}>
                                {choice}
                              </span>
                              {showCorrectHighlight && (
                                <Check className="w-5 h-5 text-green-500 inline ml-2" />
                              )}
                              {showWrongHighlight && (
                                <X className="w-5 h-5 text-red-500 inline ml-2" />
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    ) : (
                      /* Text Input Mode */
                      <div className="bg-[#111827] rounded-2xl border border-[#1F2937] p-6 mb-6">
                        <label className="block text-sm text-gray-400 mb-2">Your Answer</label>
                        <Input
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Enter your answer..."
                          className="bg-[#0B1220] border-[#1F2937] text-white text-lg py-6 font-mono"
                          disabled={showFeedback}
                          type="number"
                        />
                      </div>
                    )}

                    {/* Feedback */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={cn(
                            "rounded-2xl border p-6 mb-6",
                            isCorrect
                              ? "bg-green-500/10 border-green-500/20"
                              : "bg-red-500/10 border-red-500/20"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {isCorrect ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-green-400">Correct!</span>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                  <X className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-red-400">Incorrect</span>
                              </>
                            )}
                          </div>
                          {!isCorrect && (
                            <p className="text-gray-400">
                              Correct answer: <span className="text-white font-mono">{question.correctAnswer}</span>
                            </p>
                          )}
                          {question.hint && (
                            <p className="text-gray-500 text-sm mt-2">
                              Hint: {question.hint}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit/Next Button */}
                    <div className="mt-auto">
                      {!showFeedback ? (
                        <Button
                          onClick={handleSubmit}
                          disabled={
                            question.answerMode === "multiple-choice" 
                              ? selectedChoice === null 
                              : !answer.trim()
                          }
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg rounded-xl disabled:opacity-50"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg rounded-xl"
                        >
                          Next Question
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="scribble"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Scribble Tools */}
                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#1F2937] hover:bg-white/10"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Pen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#1F2937] hover:bg-white/10"
                      >
                        <Eraser className="w-4 h-4 mr-2" />
                        Eraser
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#1F2937] hover:bg-white/10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#1F2937] hover:bg-white/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Canvas Area */}
                    <div className="flex-1 bg-[#111827] rounded-2xl border border-[#1F2937] min-h-[300px] flex items-center justify-center">
                      <p className="text-gray-500 text-center">
                        <Pencil className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        Scribble your work here
                        <br />
                        <span className="text-sm">(Use this space for rough calculations)</span>
                      </p>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-4">
                      Switch to Answer Mode to submit your answer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
