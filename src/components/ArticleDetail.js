import React from 'react';

//function that provides the layout of the article details
function ArticleDetail({ article, onClose }) {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>Published: {article.published ? 'Yes' : 'No'}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ArticleDetail;
