import React, { useState, createContext, useContext } from 'react';
import { RxChevronDown } from 'react-icons/rx';

const AccordionContext = createContext();
const AccordionItemContext = createContext();

export function Accordion({ children, type = 'single', collapsible = false, className = '' }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(value) && collapsible ? [] : [value]);
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((item) => item !== value)
          : [...openItems, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className = '' }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={`border-b ${className}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className = '' }) {
  const { toggleItem } = useContext(AccordionContext);
  const { value, isOpen } = useContext(AccordionItemContext);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={`flex w-full items-center justify-between py-4 font-medium text-left transition-all hover:underline ${className}`}
    >
      {children}
      <RxChevronDown
        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}

export function AccordionContent({ children, className = '' }) {
  const { isOpen } = useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div className={`pb-4 pt-0 ${className}`}>
      {children}
    </div>
  );
}
