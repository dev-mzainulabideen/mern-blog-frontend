import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MOCK_STORIES = [
  { id: '1', title: 'From Beginner to Professional', content: 'My journey started when I decided to learn web development. I had no prior experience in coding and felt intimidated by the vast amount of information available online. But with determination and consistent effort, I managed to land my dream job in just 6 months.\n\nThe key to my success was having a structured learning plan. I started with HTML and CSS, then moved on to JavaScript. I built small projects every week to reinforce my learning.\n\nToday, I work as a senior developer at a tech company and love what I do. The best part is that I get to learn something new every day.', author: 'CodeMaster', date: '2024-01-15' },
  { id: '2', title: 'Building My First App', content: 'Creating my first mobile application was both challenging and rewarding. I started with basic features and gradually added more complexity.\n\nThe most important lesson I learned was to start small and iterate. Don\'t try to build everything at once.', author: 'AppBuilder', date: '2024-01-10' }
];

function StoryDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const story = MOCK_STORIES.find(s => s.id === id);

  if (!story) {
    return (
      <div className="container">
        <p>Story not found</p>
        <Link to="/stories">← {t('common.back')}</Link>
      </div>
    );
  }

  return (
    <div className="story-detail container">
      <Link to="/stories" className="back-link">← {t('common.back')}</Link>
      
      <article>
        <h1>{story.title}</h1>
        
        <div className="story-meta">
          <span>{story.author}</span>
          <span>{story.date}</span>
        </div>
        
        <div className="story-content">
          {story.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default StoryDetail;