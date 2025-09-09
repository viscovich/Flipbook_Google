
import React from 'react';
import Flipbook from './components/Flipbook';
import { STORY_PAGES } from './constants';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white flex flex-col justify-center items-center p-4 overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-amber-50">3D Storybook</h1>
        <p className="text-lg text-amber-100/70 mb-8 text-center">A 3D flipbook concept of "The Little Mermaid"</p>
        <Flipbook pages={STORY_PAGES} />
    </main>
  );
};

export default App;
