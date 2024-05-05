import React, { useState, useEffect } from 'react';

//function for creading or editing the article
function ArticleForm({ article, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ title: '', body: '', published: false });

  useEffect(() => {
    if (article) {
      setFormData(article);
    }
  }, [article]);

  //once there is a change in the form input it updates the inputs

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  //Creates a form wiht the fields requred and the form can be used to edit or create a new article
  return (
    <form onSubmit={handleSubmit}>
      <h2>{article?.id ? 'Edit Article' : 'Add New Article'}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Published:</label>
        <input
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default ArticleForm;
