import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    poll_dict: {},
    user_info: {}
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    update: (state, action) => {
        state[action.payload.key] = action.payload.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = globalSlice.actions

export default globalSlice.reducer