import React from 'react'
import {  useSelector } from 'react-redux'
import { SelectAllUsers } from '../users/UsersSlice'
import { FetchAuthor } from '../users/UsersSlice'
const PostAuthor = ({userId}) => {
const users =useSelector(SelectAllUsers)


const author = users.find(user => user.id === userId);

return (
    <span>
        By {author ? author.name : 'Unknown Author'}
    </span>
);

}

export default PostAuthor
