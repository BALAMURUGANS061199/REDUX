import { createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'
// const initialState = [
//     // {
//     //     id: '1',
//     //     title: 'Learning Redux Toolkit',
//     //     content: 'Easy',
//     //     date:sub(new Date(),{minutes: 10}).toISOString(),
//     //     reactions:{
//     //         thumbsUp:0,
//     //         wow:0,
//     //         heart:0,
//     //         rocket:0,
//     //         coffee:0
//     //     }
//     // },
//     // {
//     //     id: '2',
//     //     title: 'Subscribe',
//     //     content: 'Like and Share',
//     //     date:sub(new Date(),{minutes: 15}).toISOString(),
//     //     reactions:{
//     //         thumbsUp:0,
//     //         wow:0,
//     //         heart:0,
//     //         rocket:0,
//     //         coffee:0
//     //     }
//     // }
// ]

// const PostAdapter = createEntityAdapter({
//     sortComparer: (a, b) => b.data.localeCompare(a.data)
// })
const PostAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
});

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


export const FetchPost = createAsyncThunk('posts/fetchposts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const UpdatePost = createAsyncThunk('posts/UpdatePost', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    }
    catch (err) {
        return err.initialPost;
    }
})

export const DeletePost = createAsyncThunk('posts/DeletePost', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost

        return `${response?.status}: ${response?.statusText}`;
    }
    catch (err) {
        console.log(err)
    }

})
const initialState = PostAdapter.getInitialState({
    status: 'idle',  //'idle' | 'loading'| 'succeeded' |' failed'
    error: null,
    count: 0
})
// const initialState = {
//     posts: [],
//     status: 'idle',  //'idle' | 'loading'| 'succeeded' |' failed'
//     error: null,
//     count: 0
// }
const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingUser = state.entities[postId] //get Entities Directly
            if (existingUser) {
                existingUser.reactions[reaction]++
            }
        },
        IncreaseCount(state, action) {
            state.count = state.count + 1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(FetchPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                });
                // add any fetched posts to array
                PostAdapter.upsertMany(state, loadedPosts)
                // state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(FetchPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return 0
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                PostAdapter.addOne(state, action.payload)
                // state.posts.push(action.payload)
            })
            .addCase(UpdatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Not working Update')
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString()
                PostAdapter.upsertOne(state, action.payload)
                // const updatedPost = action.payload;
                // const index = state.posts.findIndex(post => post.id === updatedPost.id);

                // if (index !== -1) {
                //     updatedPost.date = new Date().toISOString();
                //     state.posts[index] = updatedPost;
                // } else {
                //     console.log("Update Could Not Complete");
                //     console.log(action.payload);
                // }
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Not working Delete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload
                PostAdapter.removeOne(state, id)
                // const deletedPostId = action.payload.id;
                // state.posts = state.posts.filter(post => post.id !== deletedPostId);
            });



    },
})
export const SelectAllPost = (state) => state.posts.posts;

//getSelectors Creates these Selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectPostIds
} = PostAdapter.getSelectors(state => state.posts);


export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count
export const { reactionAdded, IncreaseCount } = PostSlice.actions;
//Array Inside Only Pass Functions  
//that createSelector was Memozed Selector
export const SelectPostByUser = createSelector(
    [SelectAllPost, (state, userId) => userId],
    (posts, userId) => posts.filter(posts.userid === userId))
export default PostSlice.reducer;

export const SelectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)






// .addCase(UpdatePost.fulfilled, (state, action) => {
//     if (action.payload?.id) {
//         console.log("Update Could Not Complete")
//         console.log(action.payload)
//         return;
//     }
//     const { id } = action.payload
//     action.payload.date = new Date().toISOString();
//     const posts = state.posts.filter(post => post.id !== id);
//     state.posts = [...posts, action.payload];
// })
// .addCase(DeletePost.fulfilled, (state,action)=>{
//     if(action.payload?.id){
//         console.log('Delete could Not Complete')
//         console.log(action.payload)
//         return;
//     }
//     const {id} = action.payload
//     const posts= state.posts.filter(post => post.id !== id);
//     state.posts=posts;
// })


// PostAdded: {
//     reducer(state, action) {
//         state.posts.push(action.payload)
//     },
//     prepare(title, content, userId) {
//         return {
//             payload: {
//                 id: nanoid(),
//                 title,
//                 content,
//                 date: new Date().toISOString(),
//                 userId,
//                 reactions: {
//                     thumbsUp: 0,
//                     wow: 0,
//                     heart: 0,
//                     rocket: 0,
//                     coffee: 0
//                 }
//             }
//         }
//     }
// },