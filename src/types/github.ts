export type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
}

export type GitHubLookupResult = {
  user: GitHubUser
  repos: GitHubRepo[]
}

export type LookupStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'not-found'
  | 'error'
