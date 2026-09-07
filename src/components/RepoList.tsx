import type { GitHubRepo } from '../types/github'
import { RepoItem } from './RepoItem'
import styles from './RepoList.module.css'

type RepoListProps = {
  repos: GitHubRepo[]
}

export function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) {
    return (
      <p className={styles.empty} role="status">
        Este usuário não tem repositórios públicos.
      </p>
    )
  }

  return (
    <section className={styles.section} aria-label="Repositórios">
      <h2 className={styles.title}>
        Repositórios <span className={styles.count}>{repos.length}</span>
      </h2>
      <ul className={styles.list}>
        {repos.map((repo, index) => (
          <li
            key={repo.id}
            className={styles.listItem}
            style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
          >
            <RepoItem repo={repo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
