import { useSelector, useDispatch } from "react-redux";
import { SelectAllPost, getPostsError, getPostsStatus } from "./PostSlice";
import PostExcerpts from "./PostExcerpts";
// import PostAuthor from '../Post/PostAuthor'
// import TimeAgo from './TimeAgo'
// import ReactionButtons from "./ReactionButtons";


const PostList = () => {

    const posts = useSelector(SelectAllPost)
    const Poststatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (Poststatus == 'idle') {
    //         dispatch(FetchPost())
    //     }
    // }, [Poststatus, dispatch])


    let content
    if (Poststatus === 'loading') {
        content = <p>"Loading.."</p>
    }
    else if (Poststatus === 'succeeded') {
        const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date)) //shallow Copy get with Slice     
        content = orderedPost.map(post => <PostExcerpts key={post.id} post={post} />)
    }
    else if (Poststatus) {
        content = <p>{error}</p>
    }
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );

}

{/* <article key={post.id}>       
<h3>{post.title}</h3>
<p>{post.content.substring(0,100)}</p>
<p className="postCredit">  
    <PostAuthor userId ={post.userId}/>
    <TimeAgo timestamp={post.date}/>
    <ReactionButtons post ={post}/>
    </p> 
</article> */}

export default PostList