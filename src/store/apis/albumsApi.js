import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise(
        (resolve) => setTimeout(resolve, duration)
    );
}

const albumsApi = createApi({
    reducerPath: "albums",
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
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                },

                providesTags: (data, error, user) => {
                    if (!data) return [{ type: 'UserAlbum', id: user.id }];

                    const tags = data.map(album => ({ type: 'Album', id: album.id }));

                    tags.push({ type: 'UserAlbum', id: user.id });

                    return tags;
                }

            }),

            addAlbum: builder.mutation({
                query: (user) => {
                    return {
                        method: 'POST',
                        url: '/albums',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id
                        }
                    }
                },
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UserAlbum', id: user.id }]
                }
            }),

            removeAlbums: builder.mutation({
                query: (album) => {
                    return {
                        method: 'DELETE',
                        url: `/albums/${album.id}`
                    }
                },
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                }

            })
        }
    }

})


export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumsMutation } = albumsApi;
export const albumsReducer = albumsApi.reducer;

export default albumsApi;
