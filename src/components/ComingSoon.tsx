import React from 'react';
import { FiLock } from 'react-icons/fi';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="flex flex-col items-center">
        <FiLock className="text-6xl text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-600">Esta funcionalidade estará disponível em breve.</p>
      </div>
    </div>
  );
};

export default ComingSoon; 