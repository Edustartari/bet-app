import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global_reducer.js'

export default configureStore({
  reducer: {
    global: globalReducer
  }
})