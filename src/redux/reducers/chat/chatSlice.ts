import { createSlice } from "@reduxjs/toolkit";
// import { IMessage } from "@/types/chat";
import { Chat, ConversationData, Following } from "@/types/chat";
import { ParticipantData } from "@/types/chat";
interface InitialState {
  chatSelected: string;
  selectedChatUserData: {
    _id: "";
    userName: "";
    imageUrl: "";
    createdAt: "";
  };
  messages: Chat[];
  conversations: ConversationData[];
}
const initialState: InitialState = {
  chatSelected: "",
  selectedChatUserData: {
    _id: "",
    userName: "",
    imageUrl: "",
    createdAt: "",
  },
  messages: [],
  conversations: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatSelected: (state, action) => {
      const { selectedChatUserData } = action.payload;
      state.selectedChatUserData = selectedChatUserData;
      state.chatSelected = selectedChatUserData._id;
    },
    setConversations: (state, action) => {
      const { conversations } = action.payload;
      state.conversations = conversations;
    },
    addOneConversationToConversations: (state, action) => {
      const { conversation } = action.payload;
      console.log('conversation ',conversation);
      
      const conversationExists = state.conversations.some(conv =>
        conv.participantsData.some((participant:ParticipantData) => 
          conversation.participantsData.some((newParticipant:Following) => 
            newParticipant._id === participant._id
          )
        )
      );
      if (!conversationExists) {
        state.conversations = [conversation, ...state.conversations];
      }
    },
    setMessages: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
    setChatSelectedNull: (state) => {
      state.chatSelected = "";
    },
  },
});

export const {
  setChatSelected,
  setConversations,
  setMessages,
  setChatSelectedNull,
  addOneConversationToConversations,
} = chatSlice.actions;

export default chatSlice.reducer;
