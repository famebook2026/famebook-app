import React from 'react';

export default function Post({ post, onLike, onComment }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm">
          {post.user?.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <div className="font-semibold">{post.user?.username || 'Anon'}</div>
          <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>

      {post.text && <p className="mb-2">{post.text}</p>}
      {post.mediaUrl && (
        <div className="mb-2">
          <img src={post.mediaUrl} alt="media" className="max-h-80 object-cover w-full rounded" />
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <button onClick={() => onLike(post._id)}>{post.likes?.length || 0} 👍</button>
        <button onClick={() => onComment(post._id)}>💬 Komentarze ({post.comments?.length || 0})</button>
      </div>
    </div>
  );
}
