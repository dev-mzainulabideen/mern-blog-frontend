import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MOCK_POSTS = [
  { id: '1', title: 'New Feature Released!', content: 'We are excited to announce our latest feature that will make your experience even better. This update includes several improvements that you have been asking for. We have worked hard to bring you the best possible experience.', author: 'Admin', date: '2024-01-20' },
  { id: '2', title: 'Community Update', content: 'Our community is growing! Here\'s what\'s happening and how you can get involved. We have seen tremendous growth in our user base and we are grateful for each and every one of you.', author: 'Mod', date: '2024-01-18' },
  { id: '3', title: 'Tips for Better Code', content: 'Writing clean code is essential. Here are some tips to improve your coding habits. Remember, code is read much more often than it is written.', author: 'DevGuru', date: '2024-01-15' }
];

function PostDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="container">
        <p>Post not found</p>
        <Link to="/posts">← {t('common.back')}</Link>
      </div>
    );
  }

  return (
    <div className="post-detail container">
      <Link to="/posts" className="back-link">← {t('common.back')}</Link>
      
      <article>
        <h1>{post.title}</h1>
        
        <div className="post-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}

export default PostDetail;