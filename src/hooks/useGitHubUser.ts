import { useCallback, useRef, useState } from 'react'
import { fetchGitHubUser, GitHubApiError } from '../api/github'
import type { GitHubLookupResult, LookupStatus } from '../types/github'

type UseGitHubUserResult = {
  status: LookupStatus
  data: GitHubLookupResult | null
  message: string | null
  search: (username: string) => Promise<void>
  reset: () => void
}

export function useGitHubUser(): UseGitHubUserResult {
  const [status, setStatus] = useState<LookupStatus>('idle')
  const [data, setData] = useState<GitHubLookupResult | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const requestId = useRef(0)

  const reset = useCallback(() => {
    requestId.current += 1
    setStatus('idle')
    setData(null)
    setMessage(null)
  }, [])

  const search = useCallback(async (username: string) => {
    const id = ++requestId.current
    setStatus('loading')
    setMessage(null)
    setData(null)

    try {
      const result = await fetchGitHubUser(username)
      if (id !== requestId.current) return
      setData(result)
      setStatus('success')
    } catch (error) {
      if (id !== requestId.current) return

      if (error instanceof GitHubApiError && error.status === 404) {
        setStatus('not-found')
        setMessage('Nenhum usuário encontrado com esse username.')
        return
      }

      if (error instanceof GitHubApiError && error.status === 403) {
        setStatus('error')
        setMessage('Limite da API do GitHub atingido. Tente de novo em alguns minutos.')
        return
      }

      setStatus('error')
      setMessage('Não foi possível buscar esse usuário. Tente novamente.')
    }
  }, [])

  return { status, data, message, search, reset }
}
