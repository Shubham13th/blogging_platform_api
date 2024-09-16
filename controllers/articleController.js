// Import the Article model from your models folder
const Article = require('../models/Article');

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
const getAllArticles = async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await Article.find();
    
    // Respond with the list of articles in JSON format
    res.json(articles);
  } catch (err) {
    // Handle any errors that occur during fetching
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single article by ID
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    // Find an article by its ID
    const article = await Article.findById(req.params.id);
    
    // If the article is not found, return a 404 response
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // If the article is found, return it
    res.json(article);
  } catch (err) {
    // Handle any errors that occur (like invalid IDs)
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new article
// @route   POST /api/articles
// @access  Public
const createArticle = async (req, res) => {
  // Create a new Article instance with data from the request body
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    tags: req.body.tags
  });

  try {
    // Save the new article to the database
    const newArticle = await article.save();
    
    // Respond with the newly created article
    res.status(201).json(newArticle);
  } catch (err) {
    // Handle validation or database errors
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update an article by ID
// @route   PUT /api/articles/:id
// @access  Public
const updateArticle = async (req, res) => {
  try {
    // Find the article by ID
    const article = await Article.findById(req.params.id);
    
    // If the article is not found, return a 404 response
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update the article fields with data from the request body
    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.author = req.body.author || article.author;
    article.tags = req.body.tags || article.tags;

    // Save the updated article back to the database
    const updatedArticle = await article.save();
    
    // Respond with the updated article
    res.json(updatedArticle);
  } catch (err) {
    // Handle errors (e.g., invalid IDs or database errors)
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete an article by ID
// @route   DELETE /api/articles/:id
// @access  Public
const deleteArticle = async (req, res) => {
  try {
    // Find the article by ID and delete it
    const article = await Article.findByIdAndDelete(req.params.id);
    
    // If the article is not found, return a 404 response
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Respond with a message confirming the deletion
    res.json({ message: 'Article deleted' });
  } catch (err) {
    // Handle errors (e.g., invalid IDs or database errors)
    res.status(500).json({ message: err.message });
  }
};

// Export all the controller functions for use in routes
module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
