
import React from 'react';
import { PageContent } from '../types';

interface PageProps {
  content: PageContent;
  pageNumber: number;
}

const Page: React.FC<PageProps> = ({ content, pageNumber }) => {
  const { image, text, title, author, isCover, isBackCover } = content;

  const basePageClasses = "w-full h-full bg-[#fdfaf1] text-gray-800 flex flex-col p-6 md:p-8 overflow-hidden relative";

  if (isCover) {
    return (
      <div className={`${basePageClasses} items-center justify-center text-center bg-cover bg-center`} style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
            {author && <p className="text-xl md:text-2xl mt-4 text-white/90 drop-shadow-md">{author}</p>}
        </div>
      </div>
    );
  }
  
  if (isBackCover) {
    return (
       <div className={`${basePageClasses} items-center justify-center bg-slate-700 text-white`}>
          <h2 className="text-4xl font-bold">{title}</h2>
          <span className="absolute bottom-4 right-4 text-sm text-white/50">{pageNumber}</span>
       </div>
    )
  }

  return (
    <div className={basePageClasses}>
      {image && <img src={image} alt={`Illustration for page ${pageNumber}`} className="w-full h-full object-cover" />}
      {text && <p className="text-sm md:text-base leading-relaxed whitespace-pre-line overflow-y-auto">{text}</p>}
      <span className="absolute bottom-4 right-4 text-sm text-gray-400">{pageNumber}</span>
    </div>
  );
};

export default Page;
