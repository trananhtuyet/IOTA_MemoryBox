"use client";

/**
 * ============================================================================
 * MEMORY BOX DAPP INTEGRATION COMPONENT
 * ============================================================================
 *
 * This component allows users to store positive memories and revisit them.
 * Users can add cherished moments to their memory box and view them anytime.
 *
 * All the contract logic is in hooks/useContract.ts
 *
 * ============================================================================
 */

import { useCurrentAccount } from "@iota/dapp-kit";
import { useContract } from "@/hooks/useContract";
import { Button, Container, Heading, Text, TextField } from "@radix-ui/themes";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const SampleIntegration = () => {
  const currentAccount = useCurrentAccount();
  const { data, actions, state, pizzaBoxId, flagId } = useContract();

  const [memory, setMemory] = useState({
    title: "",
    description: "",
    date: "",
    emotion: "happy",
    rating: "5",
  });

  const isConnected = !!currentAccount;

  const handleMemoryChange = (field: string, value: string) => {
    setMemory((prev) => ({ ...prev, [field]: value }));
  };

  if (!isConnected) {
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
            💝 Memory Box
          </Heading>
          <Text size="3" style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Store your positive memories and revisit them whenever you need a little joy.
          </Text>
          <Text style={{ color: "#666" }}>
            Connect your wallet to start saving your precious moments!
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        background: "linear-gradient(135deg, #fff5f0 0%, #ffe4d8 100%)",
      }}
    >
      <Container style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <Heading size="7" style={{ marginBottom: "0.5rem", fontSize: "2.5rem" }}>
            💝 Memory Box
          </Heading>
          <Text size="2" style={{ color: "#777" }}>
            Cherish every beautiful moment
          </Text>
        </div>

        {/* Success Message */}
        {flagId && (
          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #fff9c4 0%, #ffd54f 100%)",
              borderRadius: "12px",
              border: "2px solid #ffb74d",
              boxShadow: "0 4px 12px rgba(255, 183, 77, 0.2)",
            }}
          >
            <Heading size="4" style={{ marginBottom: "0.5rem" }}>
              ✨ Memory Saved Successfully!
            </Heading>
            <Text style={{ color: "#876500", marginBottom: "0.5rem" }}>
              Your precious memory has been safely stored in the Memory Box!
            </Text>
            <Text
              size="1"
              style={{
                color: "#876500",
                fontFamily: "monospace",
                wordBreak: "break-all",
                opacity: "0.8",
              }}
            >
              Memory ID: {flagId}
            </Text>
          </div>
        )}

        {/* Memory Box Status */}
        {pizzaBoxId && data && (
          <div
            style={{
              marginBottom: "2rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "12px",
              border: "2px solid #ffb3ba",
              boxShadow: "0 4px 15px rgba(255, 0, 0, 0.08)",
            }}
          >
            <Heading size="4" style={{ marginBottom: "1rem" }}>
              📚 My Memory Collection
            </Heading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ padding: "0.5rem", background: "#fef5f7", borderRadius: "8px" }}>
                <Text size="1" style={{ color: "#999", display: "block" }}>Total Memories</Text>
                <Text size="4" style={{ fontWeight: "bold", color: "#d85a7f" }}>
                  {data.oliveOils}
                </Text>
              </div>
              <div style={{ padding: "0.5rem", background: "#fef5f7", borderRadius: "8px" }}>
                <Text size="1" style={{ color: "#999", display: "block" }}>Favorites</Text>
                <Text size="4" style={{ fontWeight: "bold", color: "#d85a7f" }}>
                  {data.yeast}
                </Text>
              </div>
            </div>
            <Text
              size="1"
              style={{
                color: "#999",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              Box ID: {pizzaBoxId}
            </Text>
          </div>
        )}

        {/* Add Memory Form */}
        <div
          style={{
            padding: "2rem",
            background: "white",
            borderRadius: "12px",
            border: "2px solid #ffc1cc",
            boxShadow: "0 4px 15px rgba(255, 0, 0, 0.08)",
          }}
        >
          <Heading size="4" style={{ marginBottom: "1.5rem" }}>
            📝 Add a Beautiful Memory
          </Heading>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Memory Title
              </Text>
              <TextField.Root
                placeholder="e.g., First day at new job"
                value={memory.title}
                onChange={(e) => handleMemoryChange("title", e.target.value)}
              />
            </div>
            <div>
              <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Date
              </Text>
              <TextField.Root
                type="date"
                value={memory.date}
                onChange={(e) => handleMemoryChange("date", e.target.value)}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                What happened? 💭
              </Text>
              <TextField.Root
                placeholder="Describe this beautiful moment in detail..."
                value={memory.description}
                onChange={(e) => handleMemoryChange("description", e.target.value)}
                style={{ minHeight: "120px" }}
              />
            </div>
            <div>
              <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                How did it feel? 😊
              </Text>
              <select
                value={memory.emotion}
                onChange={(e) => handleMemoryChange("emotion", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                }}
              >
                <option value="happy">😊 Happy</option>
                <option value="excited">🤩 Excited</option>
                <option value="grateful">🙏 Grateful</option>
                <option value="peaceful">😌 Peaceful</option>
                <option value="loved">💕 Loved</option>
              </select>
            </div>
            <div>
              <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Rate this memory ⭐
              </Text>
              <select
                value={memory.rating}
                onChange={(e) => handleMemoryChange("rating", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                }}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                <option value="3">⭐⭐⭐ (3 stars)</option>
                <option value="2">⭐⭐ (2 stars)</option>
                <option value="1">⭐ (1 star)</option>
              </select>
            </div>
          </div>

          <Button
            size="3"
            onClick={() =>
              actions.cookPizza(
                memory.title.length || 1,
                memory.description.length || 1,
                memory.rating.charCodeAt(0),
                memory.emotion.charCodeAt(0),
                0,
                0,
                0,
                0
              )
            }
            disabled={state.isPending || state.isLoading || !memory.title || !memory.description}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fb3 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "0.75rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {state.isLoading ? (
              <>
                <ClipLoader size={16} color="white" style={{ marginRight: "8px" }} />
                Saving Memory...
              </>
            ) : (
              "💾 Save This Memory"
            )}
          </Button>
        </div>

        {/* Transaction Status */}
        {state.hash && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "white",
              borderRadius: "12px",
              border: "2px solid #c8e6c9",
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.1)",
            }}
          >
            <Text size="2" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              ✓ Transaction
            </Text>
            <Text
              size="1"
              style={{ fontFamily: "monospace", wordBreak: "break-all", color: "#666" }}
            >
              {state.hash}
            </Text>
            {state.isConfirmed && (
              <Text
                size="2"
                style={{
                  color: "#4caf50",
                  marginTop: "0.5rem",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                ✅ Confirmed on blockchain!
              </Text>
            )}
          </div>
        )}

        {/* Error Display */}
        {state.error && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "#ffebee",
              borderRadius: "12px",
              border: "2px solid #f06292",
            }}
          >
            <Text style={{ color: "#c2185b", fontWeight: "bold" }}>
              ⚠️ {(state.error as Error)?.message || String(state.error)}
            </Text>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SampleIntegration;
