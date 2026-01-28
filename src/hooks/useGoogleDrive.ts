import { useQuery } from '@tanstack/react-query';
import { GoogleDriveRepository } from '../services/googleDrive/GoogleDriveRepository';
import { GoogleFileIndexEntry } from '../services/googleDrive/domain/GoogleFileIndexEntry';

/**
 * Custom hooks for Google Drive operations with React Query
 * Automatically handles caching, refetching, and data synchronization
 */

/**
 * Hook to fetch the Google Drive file index
 * @param repository - GoogleDriveRepository instance
 * @param language - Language code ('es' or 'en')
 * @returns Query result with data, loading, and error states
 */
export function useGoogleDriveIndex(
  repository: GoogleDriveRepository,
  language: 'es' | 'en',
) {
  return useQuery<GoogleFileIndexEntry[], Error>({
    queryKey: ['googleDrive', 'index', language],
    queryFn: () => repository.getFileIndex(language),
    // Cache this data for 30 minutes
    staleTime: 30 * 60 * 1000,
    // Keep the data in cache for 1 hour
    gcTime: 60 * 60 * 1000,
    // Retry failed requests up to 2 times
    retry: 2,
  });
}

/**
 * Hook to fetch Google Doc content
 * @param repository - GoogleDriveRepository instance
 * @param fileId - The ID of the Google Drive file
 * @param enabled - Whether to enable this query (default: true)
 * @returns Query result with data, loading, and error states
 */
export function useFetchGoogleDoc(
  repository: GoogleDriveRepository,
  fileId: string | null,
  enabled: boolean = !!fileId,
) {
  return useQuery<string | null, Error>({
    queryKey: ['googleDrive', 'document', fileId],
    queryFn: () => repository.getDocumentContent(fileId!),
    enabled: enabled && !!fileId,
    // Cache document content for 1 hour
    staleTime: 60 * 60 * 1000,
    // Keep the data in cache for 4 hours
    gcTime: 4 * 60 * 60 * 1000,
    // Retry failed requests up to 2 times
    retry: 2,
  });
}
