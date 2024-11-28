'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

type Place = {
  id: number;
  documentId: string;
  Title: string;
};

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        // Fetch only published places using the correct query
        const response = await api.get('/places?status=published');
        setPlaces(response.data.data); // Update state with published places
      } catch (err) {
        console.error('Error fetching places:', err);
        setError('Failed to load places.');
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Places</h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <Link href={`/place/${place.documentId}`}>{place.Title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/asdasdasdasdasd/">aaaaa</Link>
    </div>
  );
}