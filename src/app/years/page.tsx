'use client';

import { useEffect, useState } from 'react';
import { TransitionLink } from '@/app/utils/TransitionLink';
import TransitionContent from '@/app/utils/TransitionContent';
import api from '@/lib/api';

type Year = {
  id: number;
  documentId: string;
  Title: string;
};

export default function YearsPage() {
  const [years, setYears] = useState<Year[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYears() {
      try {
        // Fetch only published years using the correct query
        const response = await api.get('/years?status=published');
        setYears(response.data.data); // Update state with published years
      } catch (err) {
        console.error('Error fetching years:', err);
        setError('Failed to load years.');
      } finally {
        setLoading(false);
      }
    }

    fetchYears();
  }, []);

  if (loading) return <p></p>;
  if (error) return <p>{error}</p>;

  return (
    <TransitionContent>
      <h1>Years</h1>
      <ul>
        {years.map((year) => (
          <li key={year.id}>
            <TransitionLink href={`/year/${year.documentId}`}>{year.Title}</TransitionLink>
          </li>
        ))}
      </ul>
    </TransitionContent>
  );
}
