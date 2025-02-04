import { createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../types';

interface IAuthState {
    isUserLoggedin: boolean;
    userData: IUserData | null;
}

const initialState: IAuthState = {
    isUserLoggedin: false,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isUserLoggedin = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isUserLoggedin = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
