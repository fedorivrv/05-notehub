import type { Note } from '../../types/notes';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void; // тепер обовʼязковий
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return <p className={css.empty}>Немає нотаток для відображення</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
            <button
              className={css.button}
              onClick={() => onDelete(note.id)} // лише викликає колбек
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
