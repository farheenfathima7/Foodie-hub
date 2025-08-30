const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Get all food items
  async getFoodItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
  },

  // Get food item by ID
  async getFoodItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching food item:', error);
      throw error;
    }
  },

  // Create new food item
  async createFoodItem(foodItem) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodItem),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating food item:', error);
      throw error;
    }
  },

  // Update food item
  async updateFoodItem(id, foodItem) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodItem),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  },

  // Delete food item
  async deleteFoodItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error with health check:', error);
      throw error;
    }
  },

  // Blog endpoints
  async getBlogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  async createBlog(blog) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }
};
