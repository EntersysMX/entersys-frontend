import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Loading Skeleton Components
 * Silicon Valley-style loading states para mejor UX
 *
 * Diferentes variantes para distintos tipos de contenido:
 * - PageSkeleton: Skeleton de página completa
 * - CardSkeleton: Skeleton para cards/tarjetas
 * - HeroSkeleton: Skeleton para hero sections
 * - TextSkeleton: Skeleton para bloques de texto
 * - ImageSkeleton: Skeleton para imágenes
 * - FormSkeleton: Skeleton para formularios
 */

// ============================================
// 1. PAGE SKELETON - Página completa
// ============================================
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-[5%] py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Skeleton height={60} width="80%" />
            <Skeleton count={3} />
            <div className="flex gap-4 mt-8">
              <Skeleton width={150} height={48} />
              <Skeleton width={150} height={48} />
            </div>
          </div>
          <Skeleton height={400} />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-[5%] py-16">
        <Skeleton height={40} width="50%" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};

// ============================================
// 2. CARD SKELETON - Tarjetas/Cards
// ============================================
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-4">
          <Skeleton height={200} />
          <Skeleton height={30} width="70%" />
          <Skeleton count={2} />
          <Skeleton width={120} height={40} />
        </div>
      ))}
    </>
  );
};

// ============================================
// 3. HERO SKELETON - Hero sections
// ============================================
export const HeroSkeleton = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 pt-16 md:pt-24 lg:pt-0">
      <div className="order-2 lg:order-1">
        <Skeleton height={600} />
      </div>
      <div className="order-1 mx-[5%] space-y-6 lg:order-2">
        <Skeleton height={60} count={2} />
        <Skeleton count={3} />
        <Skeleton width={200} height={48} className="mt-8" />
      </div>
    </section>
  );
};

// ============================================
// 4. TEXT SKELETON - Bloques de texto
// ============================================
export const TextSkeleton = ({ lines = 3, titleWidth = '60%' }) => {
  return (
    <div className="space-y-4">
      <Skeleton height={32} width={titleWidth} />
      <Skeleton count={lines} />
    </div>
  );
};

// ============================================
// 5. IMAGE SKELETON - Imágenes
// ============================================
export const ImageSkeleton = ({ width = '100%', height = 300, rounded = false }) => {
  return (
    <Skeleton
      width={width}
      height={height}
      style={{ borderRadius: rounded ? '8px' : '0' }}
    />
  );
};

// ============================================
// 6. FORM SKELETON - Formularios
// ============================================
export const FormSkeleton = ({ fields = 4 }) => {
  return (
    <div className="space-y-6">
      {Array(fields).fill(0).map((_, index) => (
        <div key={index}>
          <Skeleton height={20} width={150} className="mb-2" />
          <Skeleton height={48} />
        </div>
      ))}
      <Skeleton width={200} height={48} className="mt-8" />
    </div>
  );
};

// ============================================
// 7. PORTFOLIO/GALLERY SKELETON - Portfolios
// ============================================
export const PortfolioSkeleton = ({ items = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(items).fill(0).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton height={250} />
          <Skeleton height={24} width="70%" />
          <Skeleton count={2} />
        </div>
      ))}
    </div>
  );
};

// ============================================
// 8. STATS SKELETON - Estadísticas
// ============================================
export const StatsSkeleton = ({ items = 4 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array(items).fill(0).map((_, index) => (
        <div key={index} className="text-center space-y-2">
          <Skeleton height={48} width={100} className="mx-auto" />
          <Skeleton height={20} width="80%" className="mx-auto" />
        </div>
      ))}
    </div>
  );
};

// ============================================
// 9. TABLE SKELETON - Tablas
// ============================================
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array(columns).fill(0).map((_, index) => (
          <Skeleton key={index} height={40} />
        ))}
      </div>
      {/* Rows */}
      {Array(rows).fill(0).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array(columns).fill(0).map((_, colIndex) => (
            <Skeleton key={colIndex} height={32} />
          ))}
        </div>
      ))}
    </div>
  );
};

// ============================================
// 10. LIST SKELETON - Listas
// ============================================
export const ListSkeleton = ({ items = 5 }) => {
  return (
    <div className="space-y-4">
      {Array(items).fill(0).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton circle width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// 11. TESTIMONIAL SKELETON - Testimonios
// ============================================
export const TestimonialSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="border rounded-lg p-8 space-y-4">
          <Skeleton count={3} />
          <div className="flex items-center gap-4 mt-6">
            <Skeleton circle width={64} height={64} />
            <div className="flex-1 space-y-2">
              <Skeleton width="50%" />
              <Skeleton width="40%" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// ============================================
// 12. BLOG POST SKELETON - Posts de blog
// ============================================
export const BlogPostSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Skeleton height={400} />
      <Skeleton height={48} width="80%" />
      <div className="flex gap-4">
        <Skeleton width={100} />
        <Skeleton width={150} />
      </div>
      <Skeleton count={10} />
      <Skeleton height={300} className="my-8" />
      <Skeleton count={8} />
    </div>
  );
};

// Export default para uso general
export default {
  Page: PageSkeleton,
  Card: CardSkeleton,
  Hero: HeroSkeleton,
  Text: TextSkeleton,
  Image: ImageSkeleton,
  Form: FormSkeleton,
  Portfolio: PortfolioSkeleton,
  Stats: StatsSkeleton,
  Table: TableSkeleton,
  List: ListSkeleton,
  Testimonial: TestimonialSkeleton,
  BlogPost: BlogPostSkeleton,
};
