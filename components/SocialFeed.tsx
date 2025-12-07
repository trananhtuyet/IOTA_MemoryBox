"use client"

import { useCurrentAccount } from "@iota/dapp-kit"
import { useState } from "react"
import { Button, Container, Heading, Text, TextField, TextArea } from "@radix-ui/themes"
import { useMemoryContract } from "@/hooks/useMemoryContract"

interface Memory {
  id: string
  author: string
  title: string
  description: string
  emotion: number
  rating: number
  timestamp: number
  likes: number
  likedBy: string[]
}

const EMOTIONS = [
  { value: 0, emoji: "😊", label: "Happy" },
  { value: 1, emoji: "🤩", label: "Excited" },
  { value: 2, emoji: "🙏", label: "Grateful" },
  { value: 3, emoji: "😌", label: "Peaceful" },
  { value: 4, emoji: "❤️", label: "Loved" },
]

export function SocialFeed() {
  const currentAccount = useCurrentAccount()
  const { createMemory, likeMemory } = useMemoryContract()

  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      author: "Sarah Chen",
      title: "My Wedding Day",
      description: "Just saved my most beautiful memory - my wedding day! The joy and love I felt that day is unforgettable.",
      emotion: 4,
      rating: 5,
      timestamp: Math.floor(Date.now() / 1000) - 7200,
      likes: 24,
      likedBy: [],
    },
    {
      id: "2",
      author: "Mike Johnson",
      title: "Daughter's First Steps",
      description: "My daughter took her first steps today! I'm so proud and grateful for this precious moment.",
      emotion: 1,
      rating: 5,
      timestamp: Math.floor(Date.now() / 1000) - 18000,
      likes: 42,
      likedBy: [],
    },
  ])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("4")
  const [rating, setRating] = useState("5")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getEmojiForEmotion = (emotionValue: number) => {
    return EMOTIONS.find((e) => e.value === emotionValue)?.emoji || "😊"
  }

  const getAuthorDisplay = (author: string) => {
    if (author.startsWith("0x")) {
      return `${author.slice(0, 6)}...${author.slice(-4)}`
    }
    return author
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields")
      return
    }

    if (!currentAccount) {
      alert("Please connect your wallet first")
      return
    }

    setIsSubmitting(true)

    try {
      const newMemory = await createMemory({
        title,
        description,
        emotion: parseInt(selectedEmotion),
        rating: parseInt(rating),
      })

      if (newMemory) {
        setMemories([newMemory, ...memories])
        setTitle("")
        setDescription("")
        setSelectedEmotion("4")
        setRating("5")
        alert("✅ Memory saved successfully!")
      }
    } catch (error) {
      console.error("Error creating memory:", error)
      alert("❌ Failed to save memory")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = async (memoryId: string) => {
    if (!currentAccount) {
      alert("Please connect your wallet first")
      return
    }

    const success = await likeMemory(memoryId)

    if (success) {
      setMemories(
        memories.map((m) => {
          if (m.id === memoryId) {
            const isLiked = m.likedBy.includes(currentAccount.address)
            return {
              ...m,
              likes: isLiked ? m.likes - 1 : m.likes + 1,
              likedBy: isLiked
                ? m.likedBy.filter((a) => a !== currentAccount.address)
                : [...m.likedBy, currentAccount.address],
            }
          }
          return m
        })
      )
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000)
    const diff = now - timestamp

    if (diff < 60) return "just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`

    return new Date(timestamp * 1000).toLocaleDateString()
  }

  return (
    <Container className="py-8 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Heading size="9" className="mb-2">
          📝 Memory Box
        </Heading>
        <Text className="text-gray-600">Save your beautiful moments and share them with others</Text>
      </div>

      {/* Create Memory Form */}
      {currentAccount ? (
        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-6 mb-8 border border-pink-200">
          <Heading size="6" className="mb-4">
            ✨ Share a Memory
          </Heading>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Memory Title *</label>
              <TextField.Root
                placeholder="What did you experience?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <TextArea
                placeholder="Share the details of this beautiful moment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  fontFamily: "inherit",
                  padding: "10px",
                  minHeight: "120px",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Emotion Selector */}
              <div>
                <label className="block text-sm font-medium mb-1">How did you feel?</label>
                <select
                  value={selectedEmotion}
                  onChange={(e) => setSelectedEmotion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {EMOTIONS.map((emotion) => (
                    <option key={emotion.value} value={emotion.value.toString()}>
                      {emotion.emoji} {emotion.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-1">Rate this memory</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r.toString()}>
                      {"⭐".repeat(r)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "💾 Saving..." : "💾 Save Memory"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <Text className="text-center font-medium">🔗 Connect your wallet to share memories</Text>
        </div>
      )}

      {/* Memories Feed */}
      <div className="space-y-4">
        <Heading size="6" className="mb-4">
          📚 Memories
        </Heading>

        {memories.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Text className="text-gray-600">No memories yet. Be the first to share! 💭</Text>
          </div>
        ) : (
          memories.map((memory) => (
            <div key={memory.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getEmojiForEmotion(memory.emotion)}</span>
                    <Text className="font-semibold">{getAuthorDisplay(memory.author)}</Text>
                  </div>
                  <Text size="2" className="text-gray-500">
                    {formatTimestamp(memory.timestamp)}
                  </Text>
                </div>
                <div className="text-lg">{"⭐".repeat(memory.rating)}</div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <Heading size="5" className="mb-2">
                  {memory.title}
                </Heading>
                <Text className="text-gray-700 leading-relaxed">{memory.description}</Text>
              </div>

              {/* Footer - Like Button */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleLike(memory.id)}
                  variant="ghost"
                  className={`gap-2 ${
                    currentAccount && memory.likedBy.includes(currentAccount.address)
                      ? "text-pink-500"
                      : "text-gray-500"
                  }`}
                >
                  {currentAccount && memory.likedBy.includes(currentAccount.address) ? "💕" : "🤍"} {memory.likes}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  )
}
