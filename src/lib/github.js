import axios from "axios"

const BASE_URL = "https://api.github.com"
const token = import.meta.env.VITE_GITHUB_TOKEN

export async function fetchGitHubData(username) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json"
  }

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      axios.get(`${BASE_URL}/users/${username}`, { headers }),
      axios.get(`${BASE_URL}/users/${username}/repos?per_page=100`, { headers }),
      axios.get(`${BASE_URL}/users/${username}/events?per_page=100`, { headers })
    ])

    const profile = profileRes.data
    const repos = reposRes.data
    const events = eventsRes.data

    return {
      username: profile.login,
      name: profile.name || null,
      avatar: profile.avatar_url,
      bio: profile.bio || null,
      location: profile.location || null,
      accountAge: Math.floor((new Date() - new Date(profile.created_at)) / (365.25 * 24 * 60 * 60 * 1000)),
      totalRepos: profile.public_repos,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      followers: profile.followers,
      following: profile.following,
      topLanguages: calculateTopLanguages(repos),
      reposWithoutReadme: repos.filter(r => !r.description).length,
      lastCommitDaysAgo: calculateLastCommit(events),
      longestStreak: calculateStreak(events),
      hasProfileReadme: repos.some(r => r.name.toLowerCase() === profile.login.toLowerCase()),
      profileUrl: profile.html_url
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) throw new Error("USER_NOT_FOUND")
      if (error.response.status === 403) throw new Error("RATE_LIMITED")
    }
    throw new Error("NETWORK_ERROR")
  }
}

function calculateTopLanguages(repos) {
  const langCount = {}
  repos.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1
    }
  })
  const total = Object.values(langCount).reduce((a, b) => a + b, 0)
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language, count]) => ({
      language,
      percentage: Math.round((count / total) * 100)
    }))
}

function calculateLastCommit(events) {
  const pushEvent = events.find(e => e.type === "PushEvent")
  if (!pushEvent) return 999
  const days = Math.floor((new Date() - new Date(pushEvent.created_at)) / (1000 * 60 * 60 * 24))
  return days
}

function calculateStreak(events) {
  const pushDays = [...new Set(
    events
      .filter(e => e.type === "PushEvent")
      .map(e => new Date(e.created_at).toDateString())
  )]
  return pushDays.length
}
