//This function retrieves all the articles that aree present in the ruby backend
export const fetchArticles = async () => {
    const response = await fetch('http://127.0.0.1:3000/articles');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

//This function sneds data to the ruby server to create a new article
export const createArticle = async (articleData) => {
    const response = await fetch('http://127.0.0.1:3000/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articleData })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

//This updates existing articles by their id but removes the the id created at and updated at and just attaches the id to the url as the controller was not allowing it
export async function updateArticle(id, articleData) {
    const { id: removedId, created_at: removedCreatedAt, updated_at: removedUpdatedAt, ...cleanData } = articleData;

    try {
        const response = await fetch(`${'http://127.0.0.1:3000/articles'}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article: cleanData }) 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating article:", error);
        throw error;
    }
}

//Deletes an article by looking at its ID
export const deleteArticle = async (id) => {
    const response = await fetch(`${'http://127.0.0.1:3000/articles'}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
};
