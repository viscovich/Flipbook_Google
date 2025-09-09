
import React, { useState, useMemo } from 'react';
import { PageContent } from '../types';
import Page from './Page';

interface FlipbookProps {
  pages: PageContent[];
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);


const Flipbook: React.FC<FlipbookProps> = ({ pages }) => {
  const [progress, setProgress] = useState(0);
  const totalPages = useMemo(() => Math.ceil(pages.length / 2), [pages.length]);

  const handleNext = () => {
    setProgress((p) => Math.min(p + 1, totalPages));
  };

  const handlePrev = () => {
    setProgress((p) => Math.max(p - 1, 0));
  };
  
  const isFirstPage = progress === 0;
  const isLastPage = progress === totalPages;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1000px] aspect-[2/1.4] md:aspect-[2/1.2] relative">
        <div
          className="w-full h-full relative"
          style={{ perspective: '3000px' }}
        >
          {/* Static Left Hardcover */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-800 rounded-l-lg shadow-2xl transform origin-right [transform:rotateY(2deg)]"></div>
          
          {/* Static Right Hardcover */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 rounded-r-lg shadow-2xl transform origin-left [transform:rotateY(-2deg)]"></div>

          {/* Flippable pages */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const isFlipped = index < progress;
            const zIndex = totalPages - index;
            const frontContent = pages[index * 2];
            const backContent = pages[index * 2 + 1];

            const pageStyle = {
              zIndex: isFlipped ? index + 2 : zIndex + 2, // +2 to be above hardcovers
              transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
            };

            return (
              <div
                key={index}
                className="absolute top-0 left-1/2 w-1/2 h-full transform-origin-left transition-transform duration-1000 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  ...pageStyle
                }}
              >
                {/* Front side of the physical page */}
                <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                  {frontContent && <Page content={frontContent} pageNumber={index * 2} />}
                </div>

                {/* Back side of the physical page */}
                <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {backContent && <Page content={backContent} pageNumber={index * 2 + 1} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-8 mt-8 w-full">
        <button
          onClick={handlePrev}
          disabled={isFirstPage}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-amber-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <ArrowLeftIcon className="w-6 h-6"/>
          Previous
        </button>

        <span className="text-lg font-semibold text-amber-100/80 w-32 text-center">
            {isFirstPage ? 'Cover' : `Page ${progress * 2 - 1} - ${progress * 2}`}
        </span>

        <button
          onClick={handleNext}
          disabled={isLastPage}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-amber-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRightIcon className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

export default Flipbook;
