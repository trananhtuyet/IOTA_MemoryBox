"use client"

import { useCurrentAccount } from "@iota/dapp-kit"
import { useState } from "react"
import { Button, Container, Heading, Text, TextField } from "@radix-ui/themes"

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
  liked: boolean
}

export function SocialFeed() {
  const currentAccount = useCurrentAccount()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah Chen",
      avatar: "😊",
      content: "Just saved my most beautiful memory - my wedding day! The joy and love I felt that day is unforgettable. 💕",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      liked: false,
    },
    {
      id: "2",
      author: "Mike Johnson",
      avatar: "🎉",
      content: "My daughter took her first steps today! I'm so proud and grateful for this precious moment.",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 8,
      liked: false,
    },
    {
      id: "3",
      author: "Emma Wilson",
      avatar: "✨",
      content: "Graduation day was amazing! Thank you to everyone who supported me on this journey. Memories to last forever! 🎓",
      timestamp: "1 day ago",
      likes: 56,
      comments: 12,
      liked: false,
    },
  ])

  const [newPost, setNewPost] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("happy")

  const emotions = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "🤩", label: "Excited", value: "excited" },
    { emoji: "🙏", label: "Grateful", value: "grateful" },
    { emoji: "😌", label: "Peaceful", value: "peaceful" },
    { emoji: "💕", label: "Loved", value: "loved" },
  ]

  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      alert("Please write something to share!")
      return
    }

    const newPostObj: Post = {
      id: String(posts.length + 1),
      author: currentAccount?.address?.slice(0, 10) + "..." || "Anonymous",
      avatar: emotions.find((e) => e.value === selectedEmotion)?.emoji || "💝",
      content: newPost,
      timestamp: "just now",
      likes: 0,
      comments: 0,
      liked: false,
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  if (!currentAccount) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
          <Heading size="8" style={{ marginBottom: "1rem", fontSize: "3rem" }}>
            💝 Memory Social
          </Heading>
          <Text size="3" style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Connect with others and share your beautiful memories. Celebrate life's precious moments together!
          </Text>
          <Text style={{ color: "#666" }}>
            👆 Please connect your wallet to join the community and start sharing your memories!
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        background: "linear-gradient(135deg, #fff5f0 0%, #ffe4d8 100%)",
      }}
    >
      <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <Heading size="7" style={{ marginBottom: "0.5rem", fontSize: "2.5rem" }}>
            💝 Memory Social
          </Heading>
          <Text size="2" style={{ color: "#777" }}>
            Share your beautiful moments with the world
          </Text>
        </div>

        {/* Create Post */}
        <div
          style={{
            padding: "2rem",
            background: "white",
            borderRadius: "12px",
            border: "2px solid #ffc1cc",
            boxShadow: "0 4px 15px rgba(255, 0, 0, 0.08)",
            marginBottom: "2rem",
          }}
        >
          <Heading size="4" style={{ marginBottom: "1rem" }}>
            📝 Share Your Memory
          </Heading>

          {/* Post Content */}
          <div style={{ marginBottom: "1rem" }}>
            <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              What's your beautiful moment? ✨
            </Text>
            <textarea
              placeholder="Share your precious memory... What made you happy today?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "1rem",
                borderRadius: "8px",
                border: "2px solid #f0f0f0",
                fontFamily: "inherit",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          {/* Emotion Selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <Text size="2" style={{ display: "block", marginBottom: "0.8rem", fontWeight: "bold" }}>
              How did it feel? 😊
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "0.8rem",
              }}
            >
              {emotions.map((emotion) => (
                <button
                  key={emotion.value}
                  onClick={() => setSelectedEmotion(emotion.value)}
                  style={{
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: selectedEmotion === emotion.value ? "3px solid #ff6b9d" : "2px solid #f0f0f0",
                    background: selectedEmotion === emotion.value ? "#fff5f8" : "white",
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: "2rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fff5f8"
                    e.currentTarget.style.transform = "scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = selectedEmotion === emotion.value ? "#fff5f8" : "white"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  {emotion.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePostSubmit}
            style={{
              width: "100%",
              padding: "0.8rem",
              background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fb3 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            💬 Post Memory
          </button>
        </div>

        {/* Feed */}
        <div style={{ marginTop: "2rem" }}>
          <Heading size="4" style={{ marginBottom: "1rem" }}>
            ✨ Memory Feed
          </Heading>

          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "1.5rem",
                background: "white",
                borderRadius: "12px",
                border: "2px solid #f0f0f0",
                marginBottom: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 157, 0.15)"
                e.currentTarget.style.borderColor = "#ffc1cc"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.borderColor = "#f0f0f0"
              }}
            >
              {/* Post Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                  gap: "1rem",
                }}
              >
                <div style={{ fontSize: "2.5rem" }}>{post.avatar}</div>
                <div style={{ flex: 1 }}>
                  <Text size="2" style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>
                    {post.author}
                  </Text>
                  <Text size="1" style={{ color: "#999" }}>
                    {post.timestamp}
                  </Text>
                </div>
              </div>

              {/* Post Content */}
              <Text size="2" style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
                {post.content}
              </Text>

              {/* Post Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  paddingTop: "1rem",
                  borderTop: "2px solid #f0f0f0",
                }}
              >
                <button
                  onClick={() => handleLike(post.id)}
                  style={{
                    flex: 1,
                    padding: "0.6rem",
                    background: post.liked ? "#ffebf0" : "#f9f9f9",
                    border: post.liked ? "2px solid #ff6b9d" : "2px solid #f0f0f0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: post.liked ? "#ff6b9d" : "#666",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffebf0"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = post.liked ? "#ffebf0" : "#f9f9f9"
                  }}
                >
                  {post.liked ? "❤️" : "🤍"} {post.likes}
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "0.6rem",
                    background: "#f9f9f9",
                    border: "2px solid #f0f0f0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#666",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0f0f0"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9f9f9"
                  }}
                >
                  💬 {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
