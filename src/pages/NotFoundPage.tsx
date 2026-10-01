import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <main className={styles.main}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.text}>
        Esse caminho não existe. Volte para a busca de usuários do GitHub.
      </p>
      <Link className={styles.link} to="/">
        Ir para a home
      </Link>
    </main>
  )
}
