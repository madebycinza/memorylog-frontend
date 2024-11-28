import api from '@/lib/api';

// Fetch album data using the provided documentId
async function fetchAlbum(id: string): Promise<{ Title: string } | null> {
  try {
    const response = await api.get(`/albums/${id}`);
    console.log('API Response:', response.data);
    return response.data.data; // Directly return the data object
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  // Dynamically await params before using them
  const { id } = await Promise.resolve(params); // Ensure `params.id` is awaited
  const album = await fetchAlbum(id);

  if (!album) {
    return (
      <main>
        <h1>Album not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{album.Title || 'Untitled Album'}</h1>
    </main>
  );
}
