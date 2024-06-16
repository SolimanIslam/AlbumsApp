import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise(
        (resolve) => setTimeout(resolve, duration)
    );
}

const photosApi = createApi({
    reducerPath: "photos",
    baseQuery:
        fetchBaseQuery({
            baseUrl: 'http://localhost:3005',
            fetchFn: async (...args) => {
                await pause(500);
                return fetch(...args);
            }
        }),

    endpoints: (builder) => {
        return {
            fetchPhotos: builder.query({
                query: (album) => {
                    return {
                        method: 'GET',
                        url: '/photos',
                        params: {
                            albumId: album.id
                        }
                    }
                },

                providesTags: (data, error, album) => {
                    if (!data) return [{ type: 'AlbumPhoto', id: album.id }];
                    const tags = data.map(photo => {
                        return { type: 'Photo', id: photo.id };
                    });
                    tags.push({ type: 'AlbumPhoto', id: album.id });
                    return tags;
                }
            }),

            addPhoto: builder.mutation({
                query: (album) => {
                    return {
                        method: 'POST',
                        url: '/photos',
                        body: {
                            url: faker.image.url({ width: 150, height: 150 }),
                            albumId: album.id
                        }
                    }
                },

                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumPhoto', id: album.id }]
                }
            }),

            removePhoto: builder.mutation({
                query: (photo) => {
                    return {
                        method: 'DELETE',
                        url: `/photos/${photo.id}`
                    }
                },

                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                }


            })
        }
    }
})


export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export const photosReducer = photosApi.reducer;
export default photosApi;
