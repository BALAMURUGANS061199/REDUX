import React from 'react'
import {useState} from 'react'
import EmployeeView from './EmployeeView'
import { UseSelector, useDispatch } from 'react-redux'
import { addEmployee } from './Slices/EmployeeSlice'
const CustomerAdd = () => {
    const [employee,setEmployee]= useState([])
const [input,setinput]= useState('')
const dispatch =useDispatch();

function AddEmployee(){
    if(input){
    // setEmployee((previousState)=>[...previousState,input])
    dispatch(addEmployee(input))
    setinput('')
    // console.log(employee)
    }
}
  return (
    <>
    <div>
        <h3>NEW EMPLOYEE ADD</h3>
        <input type='text' value={input} onChange={(e)=>setinput(e.target.value)}/>
        <button onClick={AddEmployee}>ADD</button>
    </div>
    {/* <EmployeeView employee={employee}/> */}
    </>
  )
}

export default CustomerAdd
