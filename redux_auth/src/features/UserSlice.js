import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: { name: '', age: 0, email: '' }
}
const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state, action) => {
            state.value ={ name: '', age: 0, email: '' }
            }
        }
    }
)
export const { login,logout } = UserSlice.actions;
export default UserSlice.reducer