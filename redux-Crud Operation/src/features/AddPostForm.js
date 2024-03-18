import { useState } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { nanoid, unwrapResult } from "@reduxjs/toolkit";
import { PostAdded } from "./Post/PostSlice"
import { SelectAllUsers } from "./users/UsersSlice";
import { addNewPost } from "./Post/PostSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [userId, setuserId] = useState('')
    const users = useSelector(SelectAllUsers)
    const [addRequestStatus,setaddRequestStatus] = useState('idle')
    const navigate= useNavigate();

    const onTitleChange = e => settitle(e.target.value)
    const onContentChange = e => setcontent(e.target.value)
    const onAuthorChange = e => setuserId(e.target.value)

    const canSave =[title,content,userId].every(Boolean) && addRequestStatus === 'idle'



    const onSavePostClick = ()=>{
        if(canSave){
            try{
                setaddRequestStatus('pending')
                dispatch(addNewPost({title,body:content,userId})).unwrap()
                settitle('')
                setcontent('')
                setuserId('')
                navigate('/')

            }
            catch(err){
                console.log(err)
            }finally{
                setaddRequestStatus('idle')
            }
        }
    }
    // const onSavePostClick = () => {
    //     if (title && content) {
    //         dispatch(
    //             PostAdded(title, content,userId))
    //         settitle('')
    //         setcontent('')
    //     }
    // }


    const userOption = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    

    return (
        <section>
            <h2>Add New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title</label>
                <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />

            <label htmlFor="postAuthor">Author:</label>
            <select name="postAuthor" value={userId} onChange={onAuthorChange}>
<option value=''></option>
{userOption}
            </select>
                <label htmlFor="postContent">Content</label>
                <textarea id='postContent' name='postContent' value={content} onChange={onContentChange} />

                <button type='button' onClick={onSavePostClick}
                disabled ={!canSave}
                >Save Post</button>
            </form>

        </section>
    );
}

export default AddPostForm

// const canSave =Boolean(title) && Boolean(content) && Boolean(userId)
