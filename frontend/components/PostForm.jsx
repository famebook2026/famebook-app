import React, { useState } from 'react';

export default function PostForm({ onCreate }) {
  const [text, setText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!text && !mediaUrl) return;
    await onCreate({ text, mediaUrl });
    setText('');
    setMediaUrl('');
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4">
      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Co chcesz opublikować?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <input
        type="text"
        placeholder="URL obrazu / wideo (opcjonalnie)"
        className="w-full border rounded p-2 mb-2"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
      />
      <div className="flex justify-end">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Opublikuj</button>
      </div>
    </form>
  );
}
