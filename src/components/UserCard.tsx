import type { GitHubUser } from '../types/github'
import styles from './UserCard.module.css'

type UserCardProps = {
  user: GitHubUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <section className={styles.card} aria-label="Perfil do usuário">
      <img
        className={styles.avatar}
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        width={88}
        height={88}
      />
      <div className={styles.body}>
        <h2 className={styles.name}>{user.name ?? user.login}</h2>
        <a className={styles.login} href={user.html_url} target="_blank" rel="noopener noreferrer">
          @{user.login}
        </a>
        {user.bio ? <p className={styles.bio}>{user.bio}</p> : null}
        <ul className={styles.meta}>
          <li>{user.public_repos} repos</li>
          <li>{user.followers} followers</li>
          <li>{user.following} following</li>
          {user.location ? <li>{user.location}</li> : null}
        </ul>
      </div>
    </section>
  )
}
