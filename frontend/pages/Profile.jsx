import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfile(id).then(res => setProfile(res.data)).catch(err => console.error(err));
  }, [id]);

  if (!profile) return <p>Ładowanie profilu...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl">
          {profile.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.username}</h2>
          <p className="text-sm text-gray-600">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-4">
        <strong>Followers:</strong> {profile.followers?.length || 0} • <strong>Following:</strong> {profile.following?.length || 0}
      </div>
    </div>
  );
}
