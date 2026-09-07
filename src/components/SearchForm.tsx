import type { FormEvent } from 'react'
import styles from './SearchForm.module.css'

type SearchFormProps = {
  onSearch: (username: string) => void
  loading: boolean
  initialValue?: string
}

export function SearchForm({ onSearch, loading, initialValue = '' }: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = String(formData.get('username') ?? '').trim()
    if (!username || loading) return
    onSearch(username)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="username">
        Username do GitHub
      </label>
      <div className={styles.row}>
        <input
          id="username"
          name="username"
          className={styles.input}
          type="text"
          placeholder="ex: torvalds"
          autoComplete="username"
          spellCheck={false}
          defaultValue={initialValue}
          disabled={loading}
          required
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Buscando…' : 'Buscar'}
        </button>
      </div>
    </form>
  )
}
