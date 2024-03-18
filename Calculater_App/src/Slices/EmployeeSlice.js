import {createSlice} from '@reduxjs/toolkit'

const initialState=[]
export const EmployeeSlice =createSlice({
name: 'Employee',
initialState,
reducers:{
    addEmployee(state,action){
        state.push(action.payload)
    },
    DeleteEmployee(state,action){
        const DeleteIndex =action.payload
       return state.filter((value,index)=> index !== DeleteIndex)
    }
}
})
//DeStructure with Reducer
export const {addEmployee,DeleteEmployee}=EmployeeSlice.actions  //action Creator
export default EmployeeSlice.reducer  //send the State to Store

