import type { postType } from '../libs/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../libs/Layout';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '../libs/atoms/Input/InputField';
import Button from '../libs/atoms/Button/Button';
import { addComment } from '../store/slices/postSlice';

export type CommentForm = {
  comment: string;
};

const PostDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);
  const [currentPost, setCurrentPost] = useState({} as postType);

  const validationSchema = Yup.object().shape({
    comment: Yup.string().trim().required('Comment is required'),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<CommentForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (posts.length) {
      const post = posts.filter((item) => item.id === Number(id));
      setCurrentPost(post[0] as postType);
    }
  }, [id, posts]);

  const handleCommentSubmit = (data: any) => {
    dispatch(
      addComment({
        id: Number(id),
        comment: data.comment,
      })
    );
    reset();
  };
  return (
    <Layout>
      <div className='post-details-wrap'>
        <div className='font-h1'>{currentPost.title}</div>
        <div className='post-desc'>{currentPost.body}</div>
        <div className='likes'>Likes: {currentPost.likes}</div>
        <div className='tags-wrap'>
          {currentPost?.tags?.map((tag) => (
            <div key={tag} className='tag'>
              {tag}
            </div>
          ))}
        </div>
        <div className='font-title'>Comments</div>
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          <div className='comment-box'>
            <Input
              type='text'
              label=''
              name='comment'
              placeholder='Enter comment...'
              register={register}
              errors={errors.comment}
            />
            <Button variant='primary' text='Comment' type='submit' />
          </div>
        </form>
        <div className='comment-section'>
          {currentPost.comments?.length > 0 ? (
            currentPost.comments.map((comment, idx) => {
              return (
                <div className='comment' key={idx}>
                  <span>{`Comment ${idx + 1}:`}</span> {comment}
                </div>
              );
            })
          ) : (
            <div>No comments yet</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
