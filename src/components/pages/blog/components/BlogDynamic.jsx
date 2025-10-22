import React, { useState, useEffect } from 'react';
import { getPosts } from '../../../../services/postsApi';
import { Blog30 } from './blog-30';

/**
 * Dynamic wrapper for Blog30 that fetches posts from API
 */
export function BlogDynamic() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts({ limit: 50 });
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Transform API data to Blog30 format
  const transformPostsToTabContent = () => {
    // Group posts by category
    const categoriesMap = {};
    const categories = ['Todos', 'Tecnología', 'Procesos', 'Gestión', 'Innovación', 'Estrategia'];

    categories.forEach(category => {
      categoriesMap[category] = [];
    });

    posts.forEach(post => {
      const postData = {
        url: `/blog/${post.slug}`,
        image: {
          src: post.image_url || 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg',
          alt: post.title,
        },
        category: post.category || 'Tecnología',
        readTime: post.read_time || '5 min lectura',
        title: post.title,
        description: post.excerpt || post.meta_description || 'Lee más sobre este artículo...',
      };

      // Add to "Todos" category
      categoriesMap['Todos'].push(postData);

      // Add to specific category
      if (categoriesMap[post.category]) {
        categoriesMap[post.category].push(postData);
      }
    });

    // Convert to tab format
    return Object.entries(categoriesMap)
      .filter(([_, content]) => content.length > 0)
      .map(([categoryName, content]) => ({
        value: categoryName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
        trigger: categoryName,
        content,
      }));
  };

  if (loading) {
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-gray-600">Cargando artículos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-red-600">Error al cargar los artículos. Por favor, intenta más tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Blog</h2>
            <p className="text-lg text-gray-600">No hay artículos publicados aún.</p>
          </div>
        </div>
      </section>
    );
  }

  const tabContent = transformPostsToTabContent();

  return <Blog30 tagline="Blog" heading="Artículos y recursos" tabs={tabContent} />;
}
