import { useAppDispatch } from '../../../store/hooks';
import { addLike, updateDislike } from '../../../store/slices/postSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type IArticleCardProps = {
  name: string;
  desc: string;
  tags: string[];
  likes: number;
  id: number;
};

const ArticleCard: React.FC<IArticleCardProps> = ({ name, desc, tags, likes, id }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();

  const handleLikeClick = () => {
    setLiked(!liked);
    if (liked) {
      dispatch(updateDislike(id));
    } else {
      dispatch(addLike(id));
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className='card' onClick={() => navigate(`/posts/${id}`)} key={id}>
        <div className='font-h2'>{name}</div>
        <div className='font-subtitle'>{desc}</div>
        <div className='reaction-wrap'>
          <div className='font-title'>Likes: {likes}</div>
        </div>
        <div className='tags-wrap'>
          {tags.map((tag) => (
            <div key={tag} className='tag'>
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className='like-btn' onClick={() => handleLikeClick()}>
        {liked ? 'Dislike' : 'Like'}
      </div>
    </>
  );
};

export default ArticleCard;
