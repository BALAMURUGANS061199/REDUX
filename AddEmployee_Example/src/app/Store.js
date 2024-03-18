import {configureStore} from '@reduxjs/toolkit'
import CountReducer from '../features/counter/CounterSlice'
export const store=configureStore({
    reducer:{
        counter:CountReducer,
    }
})
