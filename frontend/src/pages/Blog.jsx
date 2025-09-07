import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api'; // Import the API service
import './Blog.css';

const Blog = () => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [blogs, setBlogs] = useState([]); // State to hold blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log('Fetching blogs...'); // Log before fetching
      try {
        const fetchedBlogs = await apiService.getBlogs(); // Fetch blogs from API
        console.log('Fetched blogs:', fetchedBlogs); // Log the fetched blogs
        // Fix: Check if fetchedBlogs is an array, else parse JSON string
        if (typeof fetchedBlogs === 'string') {
          setBlogs(JSON.parse(fetchedBlogs));
        } else {
          setBlogs(fetchedBlogs); // Set blogs state
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []); // Fetch blogs on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Blog Content:', input);
    console.log('File:', file);
    alert("Blog submitted successfully!");

    // Create blog object
    const newBlog = {
      title: 'New Blog', // Placeholder title
      content: input,
      author: 'Anonymous', // Placeholder author
    };

    // Call API to create blog
    await apiService.createBlog(newBlog);
    setInput(''); // Clear input after submission

    // Fetch updated blogs
    const fetchedBlogs = await apiService.getBlogs();
    // Fix: Check if fetchedBlogs is an array, else parse JSON string
    if (typeof fetchedBlogs === 'string') {
      setBlogs(JSON.parse(fetchedBlogs));
    } else {
      setBlogs(fetchedBlogs); // Update blogs state
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Write Your Blog</h1>
      
      <form onSubmit={handleSubmit} className="blog-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your blog post here..."
          rows="6"
          cols="50"
          className="blog-textarea"
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
        <br />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="blogs-list">
        <h2>Submitted Blogs</h2>
        {blogs.map((blog, index) => (
          <div key={index} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p><em>By {blog.author}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
