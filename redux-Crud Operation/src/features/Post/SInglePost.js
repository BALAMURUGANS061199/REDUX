import React from 'react'
import { useSelector } from 'react-redux'
import {  SelectPostById } from './PostSlice'
import PostAuthor from '../Post/PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from "./ReactionButtons"
import { Link, useParams } from 'react-router-dom'


const SInglePost = () => {

  const { postId } =useParams();
  const post =useSelector((state)=>SelectPostById(state,Number(postId)))
  

  if(!post){
return (
<section>
    <h2>Post Not Found!</h2>
</section>
)
  }

  return (
    <article>       
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <p className="postCredit"> 
    <Link to={`/post/edit/${post.id}`} >Edit Post</Link> 
        <PostAuthor userId ={post.userId}/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post ={post}/>
        </p> 
</article>
  )
}

export default SInglePost
