import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { fetchNotes, deleteNote, createNote } from '../../services/noteService';
import { useDebounce } from 'use-debounce';
import type { GetNoteResponse, CreateNotePayload } from '../../types/notes';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<GetNoteResponse>({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page, perPage),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes', debouncedQuery, page],
      });
    },
  });  

   const createMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', debouncedQuery, page] });
      setIsModalOpen(false); // закриваємо модалку після створення
    },
  });

  const handleCreateNote = (values: CreateNotePayload) => {
    createMutation.mutate(values);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {data && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <button
    className={css.createButton}
    onClick={() => setIsModalOpen(true)}
  >
    Create note +
  </button>
      </header>

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Помилка при завантаженні нотаток</p>}

      {data && (
        <NoteList notes={data.notes} onDelete={(id) => mutation.mutate(id)} />
      )}
        {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={handleCreateNote} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
