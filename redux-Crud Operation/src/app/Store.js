import {configureStore} from '@reduxjs/toolkit'
import PostReducer from '../features/Post/PostSlice'
import UsersReducer from  '../features/users/UsersSlice'
 export const store =configureStore({
    devTools: true,
    reducer:{
        posts : PostReducer,
        users: UsersReducer,
    }
})

