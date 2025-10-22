import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { getPostBySlug, getRelatedPosts } from "../services/postsApi";
import { Badge } from "../components/ui/badge";
import { RelatedPosts } from "../components/pages/blog/components/related-posts";
import { StickyShareButton } from "../components/pages/blog/components/StickyShareButton";
import { SEOHead } from "../components/common/SEOHead";
import { RxCalendar, RxClock, RxArrowLeft } from "react-icons/rx";

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

        const postData = await getPostBySlug(slug);
        setPost(postData);

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009CA6] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Cargando artículo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
            <p className="text-lg text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#009CA6] text-white rounded-md hover:bg-[#093D53] transition-colors"
            >
              <RxArrowLeft /> Volver al blog
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Generate Schema.org structured data
  const generateSchema = () => {
    if (!post) return null;

    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://www.entersys.mx';
    const articleUrl = `${baseUrl}/blog/${post.slug}`;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.meta_description,
      "image": post.image_url,
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at || post.published_at || post.created_at,
      "author": {
        "@type": "Organization",
        "name": "Entersys",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Entersys",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      },
      "articleSection": post.category,
      "keywords": post.tags || [post.category, "Entersys", "Transformación Digital", "Gestión Empresarial"],
      "wordCount": post.content?.split(/\s+/).length || 0,
      "inLanguage": "es-MX",
      "copyrightYear": new Date(post.published_at || post.created_at).getFullYear(),
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Entersys"
      }
    };
  };

  return (
    <div>
      {post && (
        <>
          <SEOHead
            title={post.title}
            description={post.excerpt || post.meta_description}
            image={post.image_url}
            url={`${import.meta.env.VITE_SITE_URL || 'https://www.entersys.mx'}/blog/${post.slug}`}
            type="article"
            publishedTime={post.published_at || post.created_at}
            modifiedTime={post.updated_at}
            author="Entersys"
            category={post.category}
            tags={post.tags || [post.category, 'Entersys', 'Blog']}
            schema={generateSchema()}
          />
          <StickyShareButton
            title={post.title}
            url={`${import.meta.env.VITE_SITE_URL || 'https://www.entersys.mx'}/blog/${post.slug}`}
          />
        </>
      )}
      <Header />

      {/* Hero Section with Featured Image */}
      <article className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#009CA6] transition-colors"
            >
              <RxArrowLeft /> Volver al blog
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <div className="mb-6">
            <Badge className="mb-4 text-base px-4 py-1">{post.category || 'Tecnología'}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <RxCalendar className="text-[#009CA6]" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <RxClock className="text-[#009CA6]" />
                <span>{post.read_time || '5 min lectura'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container mx-auto px-4 mb-12 max-w-5xl">
          <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
            <img
              src={post.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              alt={post.title}
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-[#093D53]
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:border-b prose-h1:pb-4
            prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
            prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-700
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-lg prose-li:leading-relaxed prose-li:text-gray-700
            prose-strong:font-bold prose-strong:text-[#093D53]
            prose-em:italic prose-em:text-gray-600
            prose-a:text-[#009CA6] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#093D53]
            prose-blockquote:border-l-4 prose-blockquote:border-[#009CA6] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-[#093D53]
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
            prose-hr:border-gray-300 prose-hr:my-12">
            <ReactMarkdown
              components={{
                // Custom renderer for images with captions
                img: ({node, ...props}) => (
                  <figure className="my-8">
                    <img {...props} className="rounded-lg shadow-lg w-full" />
                    {props.alt && props.alt !== props.src && (
                      <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
                        {props.alt}
                      </figcaption>
                    )}
                  </figure>
                ),
                // Custom renderer for links (open external in new tab)
                a: ({node, ...props}) => {
                  const isExternal = props.href?.startsWith('http');
                  return (
                    <a
                      {...props}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    />
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Social Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Compartir:</span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-[#009CA6] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-[#009CA6] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-[#009CA6] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate('/blog')}
                className="text-[#009CA6] hover:text-[#093D53] font-medium transition-colors flex items-center gap-2"
              >
                <RxArrowLeft /> Ver más artículos
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16 md:py-24">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}

      <Footer />
    </div>
  );
}
