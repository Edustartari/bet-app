import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    poll_dict: {}
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updatePollDict: (state, action) => {
        console.log('action: ', action)
        state.poll_dict = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updatePollDict } = globalSlice.actions

export default globalSlice.reducer