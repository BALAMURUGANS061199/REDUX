import React, { useState } from 'react'
import {  useDispatch } from 'react-redux'
import { login,logout } from './features/UserSlice'
import { useSelector } from 'react-redux'
const Login = () => {
  const dispatch =useDispatch();
  const user =useSelector((state)=>state.user.value)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  return (
    <div>
      {!user.name && (
        <div>
<input  value={name} onChange={(e)=> setName(e.target.value)}/><br/>
<input  value={age} onChange={(e)=> setAge(e.target.value)}/><br/>
<input  value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
</div>

      )}
     {!user.name ?
      <button onClick={()=>dispatch(login({name,age,email}))}>Login</button>:
      <button onClick={()=>dispatch(logout())}>Logout</button>
     }
    </div>
  )
}

export default Login
