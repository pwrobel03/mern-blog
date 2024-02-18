import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state, action) => {
            state.error = null
        },
        updateStart: (state) => {
            state.error = null;
            state.loading = false
        },
        updateSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.currentUser = action.payload
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { signInStart, signInSuccess, signInFailure, clearError, updateStart, updateSuccess, updateFailure } = userSlice.actions
export default userSlice.reducer;