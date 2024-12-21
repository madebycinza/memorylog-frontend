'use client';

import { useEffect, useState } from 'react';
import { TransitionLink } from '@/app/utils/TransitionLink';
import TransitionContent from '@/app/utils/TransitionContent';
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

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;

  return (
    <TransitionContent>
      <h1>Places</h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <TransitionLink href={`/place/${place.documentId}`}>{place.Title}</TransitionLink>
          </li>
        ))}
      </ul>
    </TransitionContent>
  );
}