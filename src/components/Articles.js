import React, { useEffect, useState } from 'react';
import ArticleList from './ArticleList';
import ArticleForm from './ArticleForm';
import ArticleDetail from './ArticleDetail';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from './ArticalApi';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [showArticles, setShowArticles] = useState(false);
    const [filter, setFilter] = useState('all'); 

    // Fetch the articles from ruby
    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            setArticles(data);
            setFilteredArticles(data); 
        };
        loadArticles();
    }, []);

    // Fitlrers the articles whether the are published or not
    useEffect(() => {
        switch (filter) {
            case 'published':
                setFilteredArticles(articles.filter(article => article.published));
                break;
            case 'unpublished':
                setFilteredArticles(articles.filter(article => !article.published));
                break;
            default:
                setFilteredArticles(articles);
                break;
        }
    }, [filter, articles]);

    //allows the form to add an article
    const AddArticle = () => {
        setEditing(false);
        setCurrentArticle({ title: '', body: '', published: false });
        setFormVisible(true);
    };
    //allows the form to edit an article
    const EditArticle = (article) => {
        setEditing(true);
        setCurrentArticle(article);
        setFormVisible(true);
    };

    //deletes an article
    const DeleteArticle = async (id) => {
        await deleteArticle(id);
        setArticles(articles.filter(article => article.id !== id));
    };

    //shows the detail of the articla
    const ViewDetail = (article) => {
        setCurrentArticle(article);
        setDetailVisible(true);
    };

    //submits the data
    const Submit = async (article) => {
        if (editing) {
            await updateArticle(currentArticle.id, article);
            setArticles(articles.map(item => item.id === currentArticle.id ? { ...item, ...article } : item));
        } else {
            const newArticle = await createArticle(article);
            setArticles([...articles, newArticle]);
        }
        setFormVisible(false);
        setDetailVisible(false);
    };

    //toggles the visibility of article
    const ArticleVisibility = () => setShowArticles(!showArticles);

    //provides the whole article management system with buttons to add of hide
    return (
        <div>
            <h1>Articles</h1>
            <button onClick={AddArticle}>Add Article</button>
            <button onClick={ArticleVisibility}>
                {showArticles ? 'Hide Articles' : 'Show Articles'}
            </button>
            {showArticles && (
                <>
                    <div>
                        <button onClick={() => setFilter('all')}>All Articles</button>
                        <button onClick={() => setFilter('published')}>Published Articles</button>
                        <button onClick={() => setFilter('unpublished')}>Unpublished Articles</button>
                    </div>
                    <ArticleList
                        articles={filteredArticles}
                        onEdit={EditArticle}
                        onDelete={DeleteArticle}
                        onViewDetail={ViewDetail}
                    />
                </>
            )}
            {formVisible && <ArticleForm article={currentArticle} onSubmit={Submit} onCancel={() => setFormVisible(false)} />}
            {detailVisible && <ArticleDetail article={currentArticle} onClose={() => setDetailVisible(false)} />}
        </div>
    );
}

export default Articles;
