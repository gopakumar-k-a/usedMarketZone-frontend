// flowSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlowState {
  flow: string | null;
}

const initialState: FlowState = {
  flow: null,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setFlow(state, action: PayloadAction<string | null>) {
      state.flow = action.payload;
    },
    clearFlow(state) {
      state.flow = null;
    },
  },
});

export const { setFlow, clearFlow } = flowSlice.actions;
export default flowSlice.reducer;
