import React, { useEffect, useState } from 'react';
import api from '../api';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await api.getPosts();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (payload) => {
    try {
      const res = await api.createPost(payload);
      setPosts((p) => [res.data, ...p]);
    } catch (err) {
      alert('Błąd tworzenia posta');
    }
  };

  const handleLike = async (id) => {
    try {
      await api.likePost(id);
      setPosts((prev) => prev.map(p => p._id === id ? { ...p, likes: (p.likes || []).concat([]) } : p));
      // naive: refetch for accurate state
      fetch();
    } catch (err) { console.error(err); }
  };

  const handleComment = (id) => {
    const text = prompt('Twój komentarz:');
    if (!text) return;
    api.commentPost(id, { text }).then(() => fetch()).catch((e) => console.error(e));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3">
        <PostForm onCreate={handleCreate} />
        {loading ? <p>Ładowanie...</p> : posts.map(p => (
          <Post key={p._id} post={p} onLike={handleLike} onComment={handleComment} />
        ))}
      </div>
      <div className="hidden md:block md:col-span-1">
        <Sidebar />
      </div>
    </div>
  );
}
