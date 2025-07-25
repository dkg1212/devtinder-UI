import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removedUser: (state, action) => {
            return null;
        },
    },
});

export const { addUser, removedUser } = userSlice.actions;
export default userSlice.reducer;