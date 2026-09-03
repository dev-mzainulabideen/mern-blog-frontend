import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    content: `Web development is an exciting journey that starts with understanding the fundamental building blocks of the web. In this comprehensive guide, we'll explore HTML, CSS, and JavaScript - the three core technologies that power every website on the internet.

## Getting Started with HTML

HTML (HyperText Markup Language) is the foundation of any web page. It provides the structural content that browsers render. Every webpage you see starts with an HTML document.

### Key HTML Elements:
- Headers (h1-h6)
- Paragraphs (p)
- Links (a)
- Images (img)
- Lists (ul, ol)
- Divs and Spans

## Styling with CSS

CSS (Cascading Style Sheets) allows you to control the visual presentation of your HTML elements. With CSS, you can change colors, fonts, layouts, and add animations.

## Adding Interactivity with JavaScript

JavaScript brings your websites to life. It allows you to create dynamic content, handle user interactions, and communicate with servers.

## Conclusion

Web development is a vast field, but these three technologies form the foundation. Keep practicing and building projects to improve your skills!`,
    author: 'CodeMaster',
    date: '2024-01-15',
    readTime: 10
  },
  {
    id: '2',
    title: 'Understanding React Hooks',
    content: `React Hooks revolutionized the way we write React components. They allow us to use state and other React features without writing a class.

## useState Hook

The useState hook lets you add state to functional components. It's the most commonly used hook.

## useEffect Hook

The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount.

## useContext Hook

The useContext hook lets you read and subscribe to context from your component.

## Conclusion

Hooks make React code more readable and easier to reuse. Start using them in your projects today!`,
    author: 'WebWiz',
    date: '2024-01-10',
    readTime: 8
  }
];

function ArticleDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const article = MOCK_ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <div className="container">
        <p>Article not found</p>
        <Link to="/articles">← {t('common.back')}</Link>
      </div>
    );
  }

  return (
    <div className="article-detail container">
      <Link to="/articles" className="back-link">← {t('common.back')}</Link>
      
      <article>
        <h1>{article.title}</h1>
        
        <div className="article-meta">
          <span>{article.author}</span>
          <span>{article.date}</span>
          <span>{article.readTime} {t('articles.readTime')}</span>
        </div>
        
        <div className="article-content">
          {article.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={index}>{paragraph.replace('- ', '')}</li>;
            }
            if (paragraph.trim() === '') {
              return <br key={index} />;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;