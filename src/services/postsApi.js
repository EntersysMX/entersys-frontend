// API service for blog posts
const API_URL = import.meta.env.VITE_API_URL || 'https://api.entersys.mx';

/**
 * Get all published posts
 * @param {Object} options - Query options
 * @param {number} options.skip - Number of posts to skip
 * @param {number} options.limit - Maximum number of posts to return
 * @param {string} options.category - Filter by category (optional)
 * @returns {Promise<Array>} List of posts
 */
export const getPosts = async ({ skip = 0, limit = 100, category = null } = {}) => {
  try {
    const url = new URL(`${API_URL}/api/v1/posts/`);
    url.searchParams.append('published_only', 'true');
    url.searchParams.append('skip', skip);
    url.searchParams.append('limit', limit);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // Filter by category if specified
    if (category) {
      return posts.filter(post => post.category === category);
    }

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Get a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>} Post object
 */
export const getPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/posts/${slug}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    throw error;
  }
};

/**
 * Get related posts by category
 * @param {string} category - Category to filter
 * @param {string} excludeSlug - Slug to exclude (current post)
 * @param {number} limit - Maximum number of posts to return
 * @returns {Promise<Array>} List of related posts
 */
export const getRelatedPosts = async (category, excludeSlug, limit = 3) => {
  try {
    const posts = await getPosts({ limit: limit + 5, category });

    // Filter out the current post and limit results
    return posts
      .filter(post => post.slug !== excludeSlug)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    throw error;
  }
};

export default {
  getPosts,
  getPostBySlug,
  getRelatedPosts,
};
