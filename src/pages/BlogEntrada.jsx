import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { getPostBySlug, getRelatedPosts } from "../services/postsApi";
import { Badge } from "../components/ui/badge";
import { RelatedPosts } from "../components/pages/blog/components/related-posts";
import { Blog68 } from "../components/pages/blog/components/blog-68";

export default function BlogEntrada() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No se especificó un artículo');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch post by slug
        const postData = await getPostBySlug(slug);
        setPost(postData);

        // Fetch related posts
        if (postData.category) {
          const related = await getRelatedPosts(postData.category, slug, 3);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        if (err.message === 'Post not found') {
          setError('Artículo no encontrado');
        } else {
          setError('Error al cargar el artículo');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="color-scheme-1">
          <section className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
              <div className="text-center">
                <p className="text-lg text-gray-600">Cargando artículo...</p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <Header />
        <div className="color-scheme-1">
          <section className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
                <p className="text-lg text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => navigate('/blog')}
                  className="px-6 py-3 bg-[#009CA6] text-white rounded-md hover:bg-[#093D53] transition-colors"
                >
                  Volver al blog
                </button>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <Header />
      {/* Blog Post Header */}
      <div className="color-scheme-1">
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="grid gap-x-20 gap-y-12 md:grid-cols-[.5fr_1fr]">
              <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <div className="mb-5 flex w-full items-center justify-start md:mb-6">
                    <Badge className="mr-4">{post.category || 'Tecnología'}</Badge>
                    <p className="text-small inline font-semibold">
                      {post.read_time || '5 min lectura'}
                    </p>
                  </div>
                  <h1 className="heading-h2 font-bold">{post.title}</h1>
                  <div className="mt-6 flex size-full flex-col items-start md:mt-8">
                    <div className="flex items-center sm:mb-8 md:mb-0">
                      <div className="mr-8 md:mr-10 lg:mr-12">
                        <p className="text-small">
                          Publicado el {formatDate(post.published_at || post.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full overflow-hidden">
                <img
                  src={post.image_url || "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"}
                  className="aspect-[3/2] size-full rounded-image object-cover"
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Blog Content */}
      <div className="color-scheme-2">
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </section>
      </div>

      {/* Related Posts */}
      <div className="color-scheme-1">
        <RelatedPosts posts={relatedPosts} />
      </div>

      {/* Resources Section */}
      <div className="color-scheme-2">
        <Blog68 />
      </div>

      <Footer />
    </div>
  );
}
