import css from './ErrorMessege.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.error}>
      {message || 'Сталася помилка при завантаженні даних'}
    </div>
  );
}
