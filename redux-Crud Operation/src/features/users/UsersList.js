import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { SelectAllUsers } from './UsersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
const users =useSelector(SelectAllUsers)

const renderedUsers = users.map(user => (
    <li key={user.id}>
<Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
));
  return (
  <section> 
    <h2>Users</h2>
    <ul>{renderedUsers} </ul>
  </section>
    );
  };
export default UsersList
