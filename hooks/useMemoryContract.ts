import { useCurrentAccount } from '@iota/dapp-kit';

interface Memory {
  id: string;
  author: string;
  title: string;
  description: string;
  emotion: number;
  rating: number;
  timestamp: number;
  likes: number;
  likedBy: string[];
}

interface CreateMemoryParams {
  title: string;
  description: string;
  emotion: number; // 0-4
  rating: number; // 1-5
}

/**
 * Hook để tương tác với Memory contract
 * Hỗ trợ: create_memory, like_memory, fetch memories
 */
export function useMemoryContract() {
  const account = useCurrentAccount();

  /**
   * Tạo memory mới trên blockchain
   */
  const createMemory = async (params: CreateMemoryParams): Promise<Memory | null> => {
    if (!account) {
      console.error('❌ Wallet not connected');
      return null;
    }

    try {
      // TODO: Thay thế bằng thực tế contract call khi deploy xong
      // const tx = new TransactionBlock();
      // const [memory] = tx.moveCall({
      //   target: `${PACKAGE_ID}::memory::create_memory`,
      //   arguments: [
      //     tx.pure(params.title),
      //     tx.pure(params.description),
      //     tx.pure(params.emotion),
      //     tx.pure(params.rating),
      //   ],
      // });

      // Mock memory object (local storage tạm thời)
      const memory: Memory = {
        id: generateUUID(),
        author: account.address,
        title: params.title,
        description: params.description,
        emotion: params.emotion,
        rating: params.rating,
        timestamp: Math.floor(Date.now() / 1000),
        likes: 0,
        likedBy: [],
      };

      console.log('✅ Memory created (local):', memory);
      return memory;
    } catch (error) {
      console.error('❌ Error creating memory:', error);
      return null;
    }
  };

  /**
   * Like memory
   */
  const likeMemory = async (memoryId: string): Promise<boolean> => {
    if (!account) {
      console.error('❌ Wallet not connected');
      return false;
    }

    try {
      // TODO: Thay thế bằng thực tế contract call
      // const tx = new TransactionBlock();
      // tx.moveCall({
      //   target: `${PACKAGE_ID}::memory::like_memory`,
      //   arguments: [tx.object(memoryId)],
      // });

      console.log('✅ Memory liked (local):', memoryId);
      return true;
    } catch (error) {
      console.error('❌ Error liking memory:', error);
      return false;
    }
  };

  /**
   * Fetch memories từ blockchain
   */
  const fetchMemories = async (): Promise<Memory[]> => {
    // TODO: Query chain data
    return [];
  };

  return {
    createMemory,
    likeMemory,
    fetchMemories,
    isConnected: !!account,
  };
}

/**
 * Tạo UUID cho local storage
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
