import React from 'react';

//function that provides the layout of the article details
function ArticleDetail({ article, onClose }) {
  return (
    <div>
      <h2>Article Details</h2>
      <h3>{article.title}</h3>
      <p>{article.body}</p>
      <p>Published: {article.published ? 'Yes' : 'No'}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ArticleDetail;
