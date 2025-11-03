import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 p-4">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-bold mb-2">Co nowego</h4>
        <p className="text-sm text-gray-600">Zachęcaj twórców, obserwuj, komentuj i zdobywaj sławę.</p>
      </div>
    </aside>
  );
}
