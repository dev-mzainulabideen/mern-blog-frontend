import { Link } from 'react-router-dom';
import './Card.css';

function Card({ 
  title, 
  excerpt, 
  content, 
  image, 
  link, 
  meta, 
  children, 
  className = '' 
}) {
  const cardContent = (
    <>
      {image && <div className="card-image"><img src={image} alt={title} /></div>}
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {excerpt && <p className="card-excerpt">{excerpt}</p>}
        {content && <div className="card-content">{content}</div>}
        {meta && <div className="card-meta">{meta}</div>}
        {children}
      </div>
    </>
  );

  if (link) {
    return (
      <div className={`card ${className}`}>
        <Link to={link}>{cardContent}</Link>
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      {cardContent}
    </div>
  );
}

export default Card;