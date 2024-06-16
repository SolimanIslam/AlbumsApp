import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchUsers.fulfilled,
            (usersState, action) => {
                usersState.data = action.payload;
            })

        builder.addCase(
            addUser.fulfilled,
            (usersState, action) => {
                usersState.data.push(action.payload)
            }
        )

        builder.addCase(
            removeUser.fulfilled,
            (usersState, action) => {
                usersState.data = usersState.data.filter(user => user.id !== action.payload.id);
            }
        )
    }
});

export const usersReducer = usersSlice.reducer;
