import api from '@/lib/api';

// Fetch year data using the provided documentId
async function fetchYear(id: string): Promise<{ Title: string } | null> {
  try {
    const response = await api.get(`/years/${id}`);
    console.log('API Response:', response.data);
    return response.data.data; // Directly return the data object
  } catch (error) {
    console.error('Error fetching year:', error);
    return null;
  }
}

export default async function YearPage({ params }: { params: { id: string } }) {
  // Dynamically await params before using them
  const { id } = await Promise.resolve(params); // Ensure `params.id` is awaited
  const year = await fetchYear(id);

  if (!year) {
    return (
      <main>
        <h1>Year not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{year.Title || 'Untitled Year'}</h1>
    </main>
  );
}
