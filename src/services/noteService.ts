import type { Note } from '../types/notes';
import api from './api';

export interface GetNoteResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query?: string,
  page: number = 1,
  perPage: number = 10
): Promise<GetNoteResponse> {
  const params: Record<string, any> = { page, perPage };
  if (query) params.search = query;

  const response = await api.get<GetNoteResponse>('/notes', { params });
  return response.data;
}