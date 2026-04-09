'use client';

import { useState, useEffect } from 'react';
import { Key, Save, Trash2, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const providers = [
  { id: 'anthropic' as const, label: 'Anthropic (Claude)', color: 'border-orange-200 bg-orange-50' },
  { id: 'openai' as const, label: 'OpenAI (GPT-4)', color: 'border-green-200 bg-green-50' },
  { id: 'google' as const, label: 'Google (Gemini)', color: 'border-blue-200 bg-blue-50' },
];

export default function ApiKeyManager() {
  const { t } = useI18n();
  const [maskedKeys, setMaskedKeys] = useState<Record<string, string | null>>({});
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/api-keys')
      .then((res) => res.json())
      .then(setMaskedKeys)
      .catch(() => setMaskedKeys({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (provider: string) => {
    if (!inputValue.trim()) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, key: inputValue.trim() }),
      });

      if (!res.ok) throw new Error('Failed to save');

      // Refresh masked keys
      const updated = await fetch('/api/user/api-keys').then((r) => r.json());
      setMaskedKeys(updated);
      setEditingProvider(null);
      setInputValue('');
      setMessage({ text: t('apiKeys.saved'), type: 'success' });
    } catch {
      setMessage({ text: 'Failed to save API key', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (provider: string) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, key: null }),
      });

      if (!res.ok) throw new Error('Failed to remove');

      setMaskedKeys((prev) => ({ ...prev, [provider]: null }));
      setMessage({ text: t('apiKeys.removed'), type: 'success' });
    } catch {
      setMessage({ text: 'Failed to remove API key', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Key className="h-5 w-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">{t('apiKeys.title')}</h2>
      </div>
      <p className="mb-6 text-sm text-gray-500">{t('apiKeys.description')}</p>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {message.type === 'success' && <Check className="h-4 w-4" />}
            {message.text}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {providers.map((provider) => {
          const isEditing = editingProvider === provider.id;
          const hasKey = !!maskedKeys[provider.id];

          return (
            <div key={provider.id} className={`rounded-xl border p-4 ${provider.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">{provider.label}</span>
                  {hasKey && !isEditing && (
                    <span className="ml-2 font-mono text-xs text-gray-500">
                      {maskedKeys[provider.id]}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasKey && !isEditing && (
                    <button
                      onClick={() => handleRemove(provider.id)}
                      disabled={saving}
                      className="rounded-lg p-1.5 text-red-500 hover:bg-red-100 disabled:opacity-50"
                      title={t('apiKeys.remove')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {!isEditing && (
                    <button
                      onClick={() => {
                        setEditingProvider(provider.id);
                        setInputValue('');
                        setShowInput(false);
                        setMessage(null);
                      }}
                      className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      {hasKey ? t('apiKeys.update') : t('apiKeys.add')}
                    </button>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-3 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showInput ? 'text' : 'password'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t('apiKeys.placeholder')}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowInput(!showInput)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleSave(provider.id)}
                    disabled={!inputValue.trim() || saving}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    {t('apiKeys.save')}
                  </button>
                  <button
                    onClick={() => {
                      setEditingProvider(null);
                      setInputValue('');
                    }}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    {t('publish.cancel')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
