import { SelectUserById } from "./UsersSlice"
import { useParams, Link } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux";
import { SelectAllPost ,SelectPostByUser} from "../Post/PostSlice";

const UserPage = () => {

    const { userId } = useParams();
    const user = useSelector((state) => SelectUserById(state, Number(userId)))

const PostForUser =useSelector(state => SelectPostByUser(state,Number(userId)))

    // const PostForUser = useSelector(state => {
    //     const allposts = SelectAllPost(state)
    //     return allposts.filter(post => post.userId === Number(userId))
    // })
    const Post_Titile = PostForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
    return (
        <section>
            <h2>{user?.name}</h2>
            <ul>{Post_Titile}</ul>
        </section>
    )
}

export default UserPage
