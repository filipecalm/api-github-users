import type { GitHubLookupResult, GitHubRepo, GitHubUser } from '../types/github'

const API_BASE = 'https://api.github.com'

function headers(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
  }

  if (token) {
    return {
      ...base,
      Authorization: `Bearer ${token}`,
    }
  }

  return base
}

export class GitHubApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GitHubApiError'
    this.status = status
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { headers: headers() })

  if (response.status === 404) {
    throw new GitHubApiError('User not found', 404)
  }

  if (response.status === 403) {
    throw new GitHubApiError('GitHub API rate limit exceeded', 403)
  }

  if (!response.ok) {
    throw new GitHubApiError(`GitHub API error (${response.status})`, response.status)
  }

  return response.json() as Promise<T>
}

export async function fetchGitHubUser(username: string): Promise<GitHubLookupResult> {
  const trimmed = username.trim()

  if (!trimmed) {
    throw new GitHubApiError('Username is required', 400)
  }

  const encoded = encodeURIComponent(trimmed)
  const [user, repos] = await Promise.all([
    request<GitHubUser>(`/users/${encoded}`),
    request<GitHubRepo[]>(`/users/${encoded}/repos?sort=updated&per_page=100`),
  ])

  return { user, repos }
}
