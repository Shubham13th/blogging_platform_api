const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String],
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;  // Make sure to export the model
