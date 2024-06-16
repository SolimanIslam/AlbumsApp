import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import albumsApi, { albumsReducer } from "./apis/albumsApi";
import photosApi, { photosReducer } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsReducer,
        [photosApi.reducerPath]: photosReducer

    },
    middleware: (defaultMiddleware) => {
        return defaultMiddleware().concat(albumsApi.middleware).concat(photosApi.middleware);
    }
});
setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';

export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumsMutation } from './apis/albumsApi';

export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosApi';





