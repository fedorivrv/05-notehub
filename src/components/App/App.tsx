import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'

export default function App() {
    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox/>
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
  <NoteList/>
</div>
    )
}