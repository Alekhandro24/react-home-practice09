import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: builder => ({
    getGoods: builder.query({
      query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
      //   або просто ['Products'],
    }),
    addProduct: builder.mutation({
      //  body,values => структура даних, яку ми хочемо створити
      query: values => ({
        url: 'goods',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: id => ({
        url: `goods/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = goodsApi;
