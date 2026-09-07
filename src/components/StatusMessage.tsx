import styles from './StatusMessage.module.css'

type StatusMessageProps = {
  variant?: 'info' | 'error' | 'loading'
  children: string
}

export function StatusMessage({ variant = 'info', children }: StatusMessageProps) {
  return (
    <p className={`${styles.message} ${styles[variant]}`} role="status" aria-live="polite">
      {children}
    </p>
  )
}
