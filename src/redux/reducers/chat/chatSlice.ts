import { createSlice } from "@reduxjs/toolkit";
// import { IMessage } from "@/types/chat";
import { Chat, Conversation } from "@/types/chat";
interface InitialState {
  chatSelected: string;
  selectedChatUserData: {
    _id: "";
    userName: "";
    imageUrl: "";
    createdAt: "";
  };
  messages: Chat[];
  conversations: Conversation[];
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
    setMessages: (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    },
  },
});

export const { setChatSelected, setConversations,setMessages } = chatSlice.actions;

export default chatSlice.reducer;
