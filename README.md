# 💝 Memory Box - IOTA dApp

A decentralized social platform for storing and sharing positive memories using IOTA blockchain.

**Theme:** Users store positive memories to revisit later.

## 🎯 Overview

Memory Box is a Web3 social application that allows users to:
- Connect their IOTA wallet for authentication
- Create and share beautiful memories with emotions and ratings
- View a feed of memories from the community
- Like and interact with memories
- Store memories permanently on the blockchain

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Deploy smart contract
npm run iota-deploy

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## ✨ Features

### Authentication
- ✅ IOTA Wallet connection (Custom UI)
- ✅ Account info display
- ✅ Quick actions (Copy address, View in Explorer)

### Memory Management
- ✅ Create memories with:
  - Title
  - Description
  - Date
  - Emotion (Happy, Excited, Grateful, Peaceful, Loved)
  - Rating (1-5 stars)
- ✅ View memory feed from community
- ✅ Real-time post updates

### Social Interactions
- ✅ Like memories (❤️)
- ⏳ Comment on memories (in progress)
- ⏳ User profiles (coming soon)

### UI/UX
- ✅ Beautiful gradient design (pink/warm colors)
- ✅ Responsive layout
- ✅ Smooth animations
- ✅ Emoji indicators for emotions
- ✅ Loading states

## 📁 Project Structure

```
memory-box/
├── app/
│   ├── page.tsx                    # Main page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── CustomWalletConnect.tsx     # Wallet connection UI
│   ├── SocialFeed.tsx              # Memory feed & post form
│   └── Provider.tsx                # App providers
├── hooks/
│   └── useContract.ts              # Contract interaction
├── lib/
│   └── config.ts                   # IOTA config
├── contract/
│   └── pizza_box/                  # Move smart contract
│       └── sources/
│           └── pizza_box.move      # Main contract
└── public/                         # Static files
```

## 🔗 Technology Stack

- **Frontend:** Next.js, React, TypeScript
- **UI:** Radix UI, Tailwind CSS
- **Blockchain:** IOTA, Move Language
- **Wallet:** IOTA dApp Kit
- **State Management:** React Hooks, TanStack Query

## 🏗️ Architecture

```
User Interface (React Components)
    ↓
IOTA dApp Kit (Wallet Connection)
    ↓
Move Smart Contract (Blockchain)
    ↓
IOTA Network (Testnet)
```

## 📝 Usage

### 1. Connect Wallet
- Click "👛 Connect Wallet"
- Select your wallet from dropdown
- Approve connection in wallet

### 2. Create Memory
- Fill in memory details
- Select emotion
- Rate the memory (1-5 ⭐)
- Click "💬 Post Memory"

### 3. Browse Feed
- See memories from community
- Like memories (❤️)
- View memory details

### 4. View Account
- Click "ℹ️ Info" button
- See wallet address and network
- Copy address or view in explorer

## ⚠️ Current Limitations

- ❌ Data persisted locally (not on blockchain yet)
- ❌ No comment functionality
- ❌ No user profiles
- ❌ No search/filter
- ⏳ Blockchain integration in progress

## 🔄 Future Enhancements

1. **Blockchain Integration**
   - Store memories on IOTA blockchain
   - On-chain transactions for posts/likes
   - Immutable memory records

2. **Social Features**
   - User profiles & follow
   - Comments on memories
   - Share memories
   - Private memories

3. **Discovery**
   - Search memories
   - Filter by emotion
   - Timeline view
   - Archive old memories

4. **Rewards**
   - Token rewards for likes
   - NFT for special memories
   - Leaderboards

## 🛠️ Development

### Deploy Contract
```bash
npm run iota-deploy
```

### Generate Contract Types
```bash
npm run iota-generate-prompt
```

### Run Tests
```bash
npm test
```

## 📚 Documentation

- [IOTA Documentation](https://wiki.iota.org/)
- [IOTA dApp Kit](https://github.com/iotaledger/dapp-kit)
- [Next.js Docs](https://nextjs.org/docs)
- [Instruction Guide](./INSTRUCTION_GUIDE.md)

## 📄 License

MIT

## 👨‍💼 Author

Memory Box - A project for storing beautiful moments on Web3

---

**Made with ❤️ for preserving positive memories**
=======
# IOTA_MemoryBox
>>>>>>> 1af7ad65cd65c60cfa0abcc06741a0aa8237f1bb
