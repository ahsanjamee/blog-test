import type { postType } from './../../libs/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IState = {
  posts: postType[];
};

type IComment = {
  id: number;
  comment: string;
};

const initialState: IState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<postType[]>) => {
      state.posts = action.payload;
    },
    addLike: (state, action: PayloadAction<number>) => {
      state.posts.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            likes: (item.likes += 1),
          };
        }
        return item;
      });
    },

    updateDislike: (state, action: PayloadAction<number>) => {
      state.posts.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            likes: (item.likes -= 1),
          };
        }
        return item;
      });
    },

    addComment: (state, action: PayloadAction<IComment>) => {
      state.posts.map((item) => {
        if (item.id === action.payload.id) {
          item.comments.push(action.payload.comment);
          return {
            ...item,
          };
        }
        return item;
      });
    },
  },
});

export const { addPost, addLike, updateDislike, addComment } = postSlice.actions;

export default postSlice.reducer;
