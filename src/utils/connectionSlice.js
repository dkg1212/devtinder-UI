import {createSlice} from '@reduxjs/toolkit';
const connectionSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removeConnection: (state, action) => {
            return null;
        }
    }
});
export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer; 