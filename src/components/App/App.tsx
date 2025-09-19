import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';  
import type { GetNoteResponse } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';     
import { useDebounce } from 'use-debounce';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, error } = useQuery<GetNoteResponse, Error>({
  queryKey: ['notes', debouncedQuery],
  queryFn: () => fetchNotes(debouncedQuery, 1, 10),
  placeholderData: { notes: [], totalPages: 10 }, // "заглушка" до завантаження
});

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Помилка при завантаженні нотаток</p>}

      {data && <NoteList notes={data.notes} />}
    </div>
  );
}
