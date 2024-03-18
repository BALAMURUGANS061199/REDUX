import React from 'react'
import {  useSelector } from 'react-redux'
import { UseSelector } from 'react-redux'
const Profile = () => {
  const user =useSelector((state)=> state.user.value)
  const theme =useSelector((state)=> state.theme.value)
  if(!user.name){
    return <h1>Please Login </h1>
  }
  return (
    <div style={{color:theme}}>
      <h1>Profile Info</h1>
      <h2>Name : {user.name}</h2>
      <h2>age :{user.age}</h2>
      <h2>Email :{user.email}</h2>
    </div>
  )
}

export default Profile
