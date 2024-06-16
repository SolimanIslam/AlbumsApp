import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const pause = (duration) => {
    return new Promise(
        (resolve) => setTimeout(resolve, duration)
    );
}

const removeUser = createAsyncThunk(
    'user/remove',
    async (user)=>{
       const response =  await axios.delete(`http://localhost:3005/users/${user.id}`);
        console.log(response);

        await pause(1000);

        return user;
    }
         );


export {removeUser};