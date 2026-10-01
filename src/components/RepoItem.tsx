import type { GitHubRepo } from '../types/github'
import styles from './RepoItem.module.css'

type RepoItemProps = {
  repo: GitHubRepo
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <a
      className={styles.item}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.top}>
        <h3 className={styles.name}>{repo.name}</h3>
        {repo.fork ? <span className={styles.badge}>fork</span> : null}
      </div>
      {repo.description ? <p className={styles.description}>{repo.description}</p> : null}
      <div className={styles.stats}>
        {repo.language ? <span>{repo.language}</span> : null}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        <span>Atualizado {formatDate(repo.updated_at)}</span>
      </div>
    </a>
  )
}
