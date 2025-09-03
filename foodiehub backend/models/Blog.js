const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        default: ''
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better query performance
blogSchema.index({ isPublished: 1, createdAt: -1 });
blogSchema.index({ author: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ title: 'text', content: 'text' });

// Virtual for blog URL
blogSchema.virtual('url').get(function() {
    return `/blogs/${this._id}`;
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
