import {configureStore} from '@reduxjs/toolkit'
import EmployeeReducer from './Slices/EmployeeSlice'

export const store =configureStore({
devTools: true,
reducer:{
employees:EmployeeReducer
}
})