const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Create an article
router.post('/', async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            tags: req.body.tags
        });
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
