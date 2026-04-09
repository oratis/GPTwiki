'use client';

import type { AIModel } from '@/types';

const models: { value: AIModel; label: string; color: string }[] = [
  { value: 'claude', label: 'Claude', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'gpt', label: 'GPT-4', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'gemini', label: 'Gemini', color: 'bg-blue-100 text-blue-700 border-blue-200' },
];

interface ModelSelectorProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
  disabled?: boolean;
}

export default function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  return (
    <div className="flex gap-2">
      {models.map((model) => (
        <button
          key={model.value}
          onClick={() => onChange(model.value)}
          disabled={disabled}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
            value === model.value
              ? model.color + ' ring-2 ring-offset-1 ring-current'
              : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
          } disabled:opacity-50`}
        >
          {model.label}
        </button>
      ))}
    </div>
  );
}
