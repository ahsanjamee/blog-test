import { posts } from '../libs/data';
import { useEffect, useState } from 'react';
import SearchInput from '../libs/atoms/Input/SearchInput';
import Layout from '../libs/Layout';
import ArticleCard from '../libs/atoms/Card/ArticleCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addPost } from '../store/slices/postSlice';

const HomePage = () => {
  const [searchField, setSearchField] = useState('');
  const dispatch = useAppDispatch();
  const { posts: allPosts } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(addPost(posts));
  }, []);

  const filteredPosts = allPosts?.filter((post) => {
    return post.tags.some((tag) => tag.toLowerCase().includes(searchField.toLowerCase()));
  });

  return (
    <Layout>
      <SearchInput setFunc={setSearchField} placeholder={'Search posts by tags'} />
      <div className='posts-wrap'>
        {filteredPosts?.length > 0 ? (
          filteredPosts.map((post) => (
            <div className='card-wrap' key={post.id}>
              <ArticleCard id={post.id} desc={post.body} likes={post.likes} name={post.title} tags={post.tags} />
            </div>
          ))
        ) : (
          <div className='no-data'>No posts to show</div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
