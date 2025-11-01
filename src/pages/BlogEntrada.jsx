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
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-gray-700">Compartir en redes sociales:</span>
                <div className="flex flex-wrap gap-2">
                  {/* Twitter/X */}
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(post.title);
                      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors"
                    title="Compartir en X (Twitter)"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-colors"
                    title="Compartir en Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-colors"
                    title="Compartir en LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(post.title);
                      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white transition-colors"
                    title="Compartir en WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(post.title);
                      window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-[#0088cc] hover:text-white transition-colors"
                    title="Compartir en Telegram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent(post.title);
                      const body = encodeURIComponent(`Mira este artículo: ${window.location.href}`);
                      window.location.href = `mailto:?subject=${subject}&body=${body}`;
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-700 hover:text-white transition-colors"
                    title="Compartir por Email"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('¡Enlace copiado al portapapeles!');
                    }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-[#009CA6] hover:text-white transition-colors"
                    title="Copiar enlace"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
