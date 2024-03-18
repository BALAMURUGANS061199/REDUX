import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [
    // { id: '0', name: 'Balachandra' },
    // { id: '1', name: 'Jegadeesh' },
    // { id: '2', name: 'Parthipan' },
]

const USER_URL ='https://jsonplaceholder.typicode.com/users'

export const FetchAuthor =createAsyncThunk('posts/FetchUsers',async () =>{
    const response =await axios.get(USER_URL)
    return response.data
})
const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {   },
    extraReducers(builder){
        builder
        .addCase(FetchAuthor.fulfilled,(state,action) =>{
            return action.payload
        })
    }
})

export const SelectAllUsers = state => state.users;

export const SelectUserById =(state,userId) =>{
    state.users.find(user => user.id === userId)
}
export default UsersSlice.reducer