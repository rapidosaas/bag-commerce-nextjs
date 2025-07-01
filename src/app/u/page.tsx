"use client";
import Profile from '@/lib/types/profile';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncateText } from '@/lib/helpers';
import { getAvatarSource } from "@/lib/avatars";

export default function ProfilesListPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/profiles', { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profiles');
        return res.json();
      })
      .then(data => {
        // Accept both { profiles: [...] } and { profile: {...} } for compatibility
        if (Array.isArray(data.profiles)) {
          setProfiles(data.profiles);
        } else if (data.profile) {
          setProfiles([data.profile]);
        } else {
          setProfiles([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-center">Loading profiles...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <main className="max-w-3xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Micro-Importers</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {profiles.length === 0 && <div className="text-center text-muted-foreground col-span-full">No profiles found.</div>}
        {profiles.map(profile => (
          <Link
            key={profile._id ?? profile.username}
            href={`/u/${profile.username}`}
          >
            <section className="grid gap-6 max-w-[400px] md:max-w-[500px] mx-auto">
                <div className="rounded-2xl border p-10 text-center shadow-lg">
                <Image 
                    src={getAvatarSource(profile?.image ?? null)}
                    alt={`${profile?.name}'s avatar`}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"        
                />
                <h1 className="text-xl font-semibold text-slate-800">{truncateText(profile?.name, 10)}</h1>
                <p className="text-muted-foreground text-sm">{truncateText(profile?.bio, 10)}</p>
                </div>
            </section>
          </Link>
        ))}
      </div>
    </main>
  );
}
