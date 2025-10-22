import React, { useState, createContext, useContext, useEffect } from 'react';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

const CarouselContext = createContext();

export function Carousel({ children, className = '', opts = {}, setApi }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
  };

  const scrollTo = (index) => {
    setCurrentIndex(index);
  };

  const selectedScrollSnap = () => currentIndex;

  // Provide API to parent component
  useEffect(() => {
    if (setApi) {
      setApi({
        scrollTo,
        selectedScrollSnap,
        on: (event, callback) => {
          // Simple event emitter for 'select' event
          // In a real implementation, you'd want a proper event system
        }
      });
    }
  }, [setApi, currentIndex]);

  return (
    <CarouselContext.Provider
      value={{ currentIndex, next, previous, scrollTo, itemsCount, setItemsCount }}
    >
      <div className={`relative ${className}`}>{children}</div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className = '' }) {
  const { currentIndex, setItemsCount } = useContext(CarouselContext);
  const items = React.Children.toArray(children);

  useEffect(() => {
    setItemsCount(items.length);
  }, [items.length, setItemsCount]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items}
      </div>
    </div>
  );
}

export function CarouselItem({ children, className = '' }) {
  return (
    <div className={`min-w-full flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function CarouselPrevious({ className = '' }) {
  const { previous } = useContext(CarouselContext);

  return (
    <button
      type="button"
      onClick={previous}
      className={className}
      aria-label="Anterior"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        border: '2px solid #093D53',
        backgroundColor: '#fff',
        color: '#093D53',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(9, 61, 83, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#093D53';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 61, 83, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.color = '#093D53';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(9, 61, 83, 0.15)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.96)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
    >
      <RxChevronLeft style={{
        width: '24px',
        height: '24px',
        minWidth: '24px',
        minHeight: '24px',
        strokeWidth: '0.5px'
      }} />
    </button>
  );
}

export function CarouselNext({ className = '' }) {
  const { next } = useContext(CarouselContext);

  return (
    <button
      type="button"
      onClick={next}
      className={className}
      aria-label="Siguiente"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        border: '2px solid #093D53',
        backgroundColor: '#fff',
        color: '#093D53',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(9, 61, 83, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#093D53';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 61, 83, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.color = '#093D53';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(9, 61, 83, 0.15)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.96)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
      }}
    >
      <RxChevronRight style={{
        width: '24px',
        height: '24px',
        minWidth: '24px',
        minHeight: '24px',
        strokeWidth: '0.5px'
      }} />
    </button>
  );
}
