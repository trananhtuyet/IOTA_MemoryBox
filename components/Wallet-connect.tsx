"use client"

import { ConnectButton } from "@iota/dapp-kit"
import { useCurrentAccount } from "@iota/dapp-kit"
import { useState } from "react"

export function WalletConnect() {
  const currentAccount = useCurrentAccount()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div style={{
      padding: "1.5rem",
      background: "linear-gradient(135deg, #fff9f7 0%, #ffe8df 100%)",
      borderBottom: "3px solid #ff6b9d",
      boxShadow: "0 4px 12px rgba(255, 107, 157, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}>
        {/* Logo & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fb3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            💝 Memory Box
          </div>
          <div style={{
            fontSize: "0.85rem",
            color: "#999",
            fontStyle: "italic",
          }}>
            Cherish Your Beautiful Moments
          </div>
        </div>

        {/* Wallet & Info Section */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}>
          {currentAccount && (
            <button
              onClick={() => setShowInfo(!showInfo)}
              style={{
                padding: "0.6rem 1rem",
                background: "white",
                border: "2px solid #ff6b9d",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "#ff6b9d",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff0f5"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white"
              }}
            >
              ℹ️ Info
            </button>
          )}
          <div style={{ visibility: "hidden", position: "absolute", pointerEvents: "none" }}>
            <ConnectButton />
          </div>
          {currentAccount && (
            <div style={{
              padding: "0.6rem 1rem",
              background: "#c8e6c9",
              borderRadius: "8px",
              fontWeight: "bold",
              color: "#2e7d32",
              fontSize: "0.9rem",
            }}>
              ✅ Connected
            </div>
          )}
          {!currentAccount && (
            <button
              onClick={() => {
                const btn = document.querySelector('button[type="button"]') as HTMLButtonElement
                btn?.click()
              }}
              style={{
                padding: "0.6rem 1.2rem",
                background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fb3 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              👛 Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Account Info Box */}
      {currentAccount && showInfo && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          background: "white",
          borderRadius: "12px",
          border: "2px solid #ffc1cc",
          boxShadow: "0 4px 12px rgba(255, 107, 157, 0.08)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {/* Account Address */}
            <div>
              <div style={{
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}>
                📍 Account Address
              </div>
              <div style={{
                padding: "0.75rem",
                background: "#fef5f7",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                wordBreak: "break-all",
                color: "#666",
              }}>
                {currentAccount.address}
              </div>
            </div>

            {/* Network Info */}
            <div>
              <div style={{
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}>
                🌐 Network
              </div>
              <div style={{
                padding: "0.75rem",
                background: "#fef5f7",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                color: "#ff6b9d",
                fontWeight: "bold",
              }}>
                IOTA Testnet
              </div>
            </div>

            {/* Status */}
            <div>
              <div style={{
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}>
                ✓ Status
              </div>
              <div style={{
                padding: "0.75rem",
                background: "#c8e6c9",
                borderRadius: "8px",
                color: "#2e7d32",
                fontWeight: "bold",
              }}>
                ✅ Connected
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "2px solid #f0f0f0",
          }}>
            <div style={{
              fontSize: "0.85rem",
              color: "#999",
              marginBottom: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}>
              ⚡ Quick Actions
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentAccount.address)
                  alert("Address copied to clipboard!")
                }}
                style={{
                  padding: "0.6rem 1rem",
                  background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fb3 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                📋 Copy Address
              </button>
              <button
                onClick={() => {
                  const explorerUrl = `https://explorer.testnet.iota.org/testnet/account/${currentAccount.address}`
                  window.open(explorerUrl, "_blank")
                }}
                style={{
                  padding: "0.6rem 1rem",
                  background: "linear-gradient(135deg, #ffb3ba 0%, #ffc1cc 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                🔗 View in Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

