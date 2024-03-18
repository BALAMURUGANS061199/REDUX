import {configureStore} from '@reduxjs/toolkit'
import CustomerReducer from './Slices/CustomerSlice'

export const store =configureStore({
    devTools: true,
reducer:{
customers:CustomerReducer
}
})