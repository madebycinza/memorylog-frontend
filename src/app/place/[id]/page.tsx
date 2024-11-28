import api from '@/lib/api';

// Fetch place data using the provided documentId
async function fetchPlace(id: string): Promise<{ Title: string } | null> {
  try {
    const response = await api.get(`/places/${id}`);
    console.log('API Response:', response.data);
    return response.data.data; // Directly return the data object
  } catch (error) {
    console.error('Error fetching place:', error);
    return null;
  }
}

export default async function PlacePage({ params }: { params: { id: string } }) {
  // Dynamically await params before using them
  const { id } = await Promise.resolve(params); // Ensure `params.id` is awaited
  const place = await fetchPlace(id);

  if (!place) {
    return (
      <main>
        <h1>Place not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{place.Title || 'Untitled Place'}</h1>
    </main>
  );
}
