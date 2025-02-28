import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  createdAt: string;
}

interface ChatState {
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  isTyping: Record<string, boolean>;
  onlineUsers: string[];
}

const initialState: ChatState = {
  messages: {},
  activeConversationId: null,
  isTyping: {},
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>,
    ) => {
      const { conversationId, messages } = action.payload;
      state.messages[conversationId] = messages;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      if (!state.messages[message.conversationId]) {
        state.messages[message.conversationId] = [];
      }
      state.messages[message.conversationId].push(message);
    },

    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload;
    },

    setTypingStatus: (
      state,
      action: PayloadAction<{ conversationId: string; isTyping: boolean }>,
    ) => {
      const { conversationId, isTyping } = action.payload;
      state.isTyping[conversationId] = isTyping;
    },

    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },

    addOnlineUser: (state, action: PayloadAction<string>) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },

    removeOnlineUser: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const {
  setMessages,
  addMessage,
  setActiveConversation,
  setTypingStatus,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} = chatSlice.actions;

export default chatSlice.reducer;
