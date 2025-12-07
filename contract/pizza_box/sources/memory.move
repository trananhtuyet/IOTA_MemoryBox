module memory_box::memory {
    use std::string::{Self, String};
    use iota::object::{Self, UID};
    use iota::tx_context::{Self, TxContext};
    use iota::transfer;
    use iota::event;

    // ===== Structs =====

    /// Represents a single memory
    public struct Memory has key, store {
        id: UID,
        author: address,
        title: String,
        description: String,
        emotion: u8,  // 0: happy, 1: excited, 2: grateful, 3: peaceful, 4: loved
        rating: u8,   // 1-5 stars
        timestamp: u64,
        likes: u64,
    }

    /// Collection of memories for a user
    public struct MemoryBox has key, store {
        id: UID,
        owner: address,
        memory_count: u64,
        total_likes: u64,
    }

    /// Like record for a memory
    public struct Like has key, store {
        id: UID,
        memory_id: address,
        liker: address,
    }

    // ===== Events =====

    public struct MemoryCreated has copy, drop {
        memory_id: address,
        author: address,
        emotion: u8,
        rating: u8,
    }

    public struct MemoryLiked has copy, drop {
        memory_id: address,
        liker: address,
    }

    // ===== Constants =====

    const EMOTION_HAPPY: u8 = 0;
    const EMOTION_EXCITED: u8 = 1;
    const EMOTION_GRATEFUL: u8 = 2;
    const EMOTION_PEACEFUL: u8 = 3;
    const EMOTION_LOVED: u8 = 4;

    const MAX_RATING: u8 = 5;
    const MIN_RATING: u8 = 1;

    // ===== Error Codes =====

    const EInvalidRating: u64 = 1;
    const EInvalidEmotion: u64 = 2;
    const EUnauthorized: u64 = 3;

    // ===== Create Memory Box =====

    /// Create a new memory box for the user
    public fun create_memory_box(ctx: &mut TxContext): MemoryBox {
        let owner = tx_context::sender(ctx);
        
        MemoryBox {
            id: object::new(ctx),
            owner,
            memory_count: 0,
            total_likes: 0,
        }
    }

    // ===== Create Memory =====

    /// Create a new memory and add it to the box
    public fun create_memory(
        box: &mut MemoryBox,
        title: String,
        description: String,
        emotion: u8,
        rating: u8,
        ctx: &mut TxContext,
    ): Memory {
        // Validate inputs
        assert!(emotion <= 4, EInvalidEmotion);
        assert!(rating >= MIN_RATING && rating <= MAX_RATING, EInvalidRating);

        let author = tx_context::sender(ctx);
        let timestamp = tx_context::epoch(ctx);

        let memory = Memory {
            id: object::new(ctx),
            author,
            title,
            description,
            emotion,
            rating,
            timestamp,
            likes: 0,
        };

        // Update memory box
        box.memory_count = box.memory_count + 1;

        // Emit event
        event::emit(MemoryCreated {
            memory_id: object::id_address(&memory),
            author,
            emotion,
            rating,
        });

        memory
    }

    // ===== Like Memory =====

    /// Like a memory
    public fun like_memory(
        memory: &mut Memory,
        ctx: &mut TxContext,
    ): Like {
        let liker = tx_context::sender(ctx);

        memory.likes = memory.likes + 1;

        let like = Like {
            id: object::new(ctx),
            memory_id: object::id_address(memory),
            liker,
        };

        event::emit(MemoryLiked {
            memory_id: object::id_address(memory),
            liker,
        });

        like
    }

    // ===== View Functions =====

    /// Get memory author
    public fun get_author(memory: &Memory): address {
        memory.author
    }

    /// Get memory title
    public fun get_title(memory: &Memory): &String {
        &memory.title
    }

    /// Get memory description
    public fun get_description(memory: &Memory): &String {
        &memory.description
    }

    /// Get memory emotion
    public fun get_emotion(memory: &Memory): u8 {
        memory.emotion
    }

    /// Get memory rating
    public fun get_rating(memory: &Memory): u8 {
        memory.rating
    }

    /// Get memory likes
    public fun get_likes(memory: &Memory): u64 {
        memory.likes
    }

    /// Get memory timestamp
    public fun get_timestamp(memory: &Memory): u64 {
        memory.timestamp
    }

    /// Get memory box owner
    public fun get_box_owner(box: &MemoryBox): address {
        box.owner
    }

    /// Get memory box count
    public fun get_memory_count(box: &MemoryBox): u64 {
        box.memory_count
    }

    /// Get total likes in box
    public fun get_total_likes(box: &MemoryBox): u64 {
        box.total_likes
    }

    // ===== Update Functions =====

    /// Update memory box total likes
    public fun update_box_likes(box: &mut MemoryBox, likes: u64) {
        box.total_likes = box.total_likes + likes;
    }

    // ===== Transfer =====

    /// Transfer memory to user
    public fun transfer_memory(memory: Memory, to: address) {
        transfer::public_transfer(memory, to);
    }

    /// Transfer memory box to user
    public fun transfer_memory_box(box: MemoryBox, to: address) {
        transfer::public_transfer(box, to);
    }

    /// Share memory with all (store on chain)
    public fun share_memory(memory: Memory) {
        transfer::public_share_object(memory);
    }
}
