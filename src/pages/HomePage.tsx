import { SearchForm } from '../components/SearchForm'
import { StatusMessage } from '../components/StatusMessage'
import { UserCard } from '../components/UserCard'
import { RepoList } from '../components/RepoList'
import { useGitHubUser } from '../hooks/useGitHubUser'
import styles from './HomePage.module.css'

export function HomePage() {
  const { status, data, message, search } = useGitHubUser()

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <p className={styles.brand}>GitHub Users</p>
        <h1 className={styles.title}>Encontre repositórios pelo username</h1>
        <p className={styles.subtitle}>
          Digite um usuário do GitHub e veja o perfil com os repositórios públicos.
        </p>
        <SearchForm onSearch={search} loading={status === 'loading'} />
      </header>

      <div className={styles.results}>
        {status === 'loading' ? (
          <StatusMessage variant="loading">Consultando a API do GitHub…</StatusMessage>
        ) : null}

        {status === 'not-found' || status === 'error' ? (
          <StatusMessage variant="error">{message ?? 'Algo deu errado.'}</StatusMessage>
        ) : null}

        {status === 'idle' ? (
          <StatusMessage variant="info">
            Comece buscando um username — por exemplo, microsoft ou vercel.
          </StatusMessage>
        ) : null}

        {status === 'success' && data ? (
          <>
            <UserCard user={data.user} />
            <RepoList repos={data.repos} />
          </>
        ) : null}
      </div>
    </main>
  )
}
