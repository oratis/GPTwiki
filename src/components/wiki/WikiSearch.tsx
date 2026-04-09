'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface WikiSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function WikiSearch({ onSearch, placeholder }: WikiSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search wikis...'}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-blue-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </form>
  );
}
