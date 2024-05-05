import React from 'react';

//function that shows how the articles are rendered onto the page with the title body and 3 buttons
function ArticleList({ articles, onEdit, onDelete, onViewDetail }) {
  return (
    <div>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <button onClick={() => onViewDetail(article)}>View Details</button>
            <button onClick={() => onEdit(article)}>Edit</button>
            <button onClick={() => onDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;

