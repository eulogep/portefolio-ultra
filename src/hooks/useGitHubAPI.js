import { useState, useEffect, useCallback, useRef } from 'react';

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'eulogep';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REFRESH_INTERVAL = 30 * 1000; // 30 seconds

export const useGitHubAPI = () => {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const cacheRef = useRef(new Map());
  const intervalRef = useRef(null);

  // Cache helper functions
  const getCachedData = (key) => {
    const cached = cacheRef.current.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  };

  const setCachedData = (key, data) => {
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now()
    });
  };

  // GitHub API call with caching and error handling
  const fetchFromGitHub = useCallback(async (endpoint, cacheKey) => {
    try {
      // Check cache first
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }, []);

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    try {
      const data = await fetchFromGitHub(`/users/${USERNAME}`, 'profile');
      setProfile({
        name: data.name,
        bio: data.bio,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at,
        location: data.location,
        blog: data.blog,
        company: data.company
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  }, [fetchFromGitHub]);

  // Fetch repositories with enhanced data
  const fetchRepositories = useCallback(async () => {
    try {
      const data = await fetchFromGitHub(
        `/users/${USERNAME}/repos?sort=updated&per_page=50`, 
        'repos'
      );
      
      const enhancedRepos = data
        .filter(repo => !repo.fork) // Filter out forks
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          watchers_count: repo.watchers_count,
          size: repo.size,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          topics: repo.topics || [],
          visibility: repo.visibility,
          default_branch: repo.default_branch
        }))
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

      setRepos(enhancedRepos);
      return enhancedRepos;
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      return [];
    }
  }, [fetchFromGitHub]);

  // Fetch recent commits across repositories
  const fetchRecentCommits = useCallback(async (reposList = repos) => {
    try {
      if (!reposList.length) return;

      const commitPromises = reposList
        .slice(0, 10) // Limit to top 10 repos
        .map(async (repo) => {
          try {
            const commits = await fetchFromGitHub(
              `/repos/${repo.full_name}/commits?per_page=5`,
              `commits-${repo.name}`
            );
            
            return commits.map(commit => ({
              sha: commit.sha.substring(0, 7),
              message: commit.commit.message.split('\n')[0], // First line only
              author: commit.commit.author.name,
              date: commit.commit.author.date,
              url: commit.html_url,
              repo: repo.name,
              repo_url: repo.html_url
            }));
          } catch (error) {
            console.error(`Failed to fetch commits for ${repo.name}:`, error);
            return [];
          }
        });

      const allCommits = await Promise.all(commitPromises);
      const flatCommits = allCommits
        .flat()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 20); // Keep only 20 most recent

      setCommits(flatCommits);
    } catch (error) {
      console.error('Failed to fetch commits:', error);
    }
  }, [fetchFromGitHub, repos]);

  // Calculate enhanced statistics
  const calculateStats = useCallback((reposList, commitsList) => {
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;
    let totalSize = 0;

    reposList.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      totalSize += repo.size;
    });

    const topLanguages = Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));

    const recentActivity = commitsList.slice(0, 10);
    const commitsThisWeek = commitsList.filter(commit => {
      const commitDate = new Date(commit.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return commitDate > weekAgo;
    }).length;

    setStats({
      totalRepos: reposList.length,
      totalStars,
      totalForks,
      totalSize: Math.round(totalSize / 1024), // Convert to MB
      topLanguages,
      recentActivity,
      commitsThisWeek,
      mostActiveRepo: reposList[0]?.name || '',
      lastCommit: commitsList[0]?.date || null
    });
  }, []);

  // Main data fetching function
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await fetchProfile();
      const reposList = await fetchRepositories();
      await fetchRecentCommits(reposList);
      
      setLastUpdate(new Date());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [fetchProfile, fetchRepositories, fetchRecentCommits]);

  // Calculate stats when repos or commits update
  useEffect(() => {
    if (repos.length && commits.length) {
      calculateStats(repos, commits);
    }
  }, [repos, commits, calculateStats]);

  // Auto-refresh functionality
  useEffect(() => {
    // Initial fetch
    fetchAllData();

    // Set up auto-refresh interval
    intervalRef.current = setInterval(fetchAllData, REFRESH_INTERVAL);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchAllData]);

  // Manual refresh function
  const refresh = useCallback(async () => {
    // Clear cache for fresh data
    cacheRef.current.clear();
    await fetchAllData();
  }, [fetchAllData]);

  // Get repository by name
  const getRepoByName = useCallback((name) => {
    return repos.find(repo => repo.name === name);
  }, [repos]);

  // Get commits for specific repo
  const getCommitsForRepo = useCallback((repoName) => {
    return commits.filter(commit => commit.repo === repoName);
  }, [commits]);

  // Search repositories
  const searchRepos = useCallback((query) => {
    if (!query) return repos;
    
    const lowerQuery = query.toLowerCase();
    return repos.filter(repo =>
      repo.name.toLowerCase().includes(lowerQuery) ||
      repo.description?.toLowerCase().includes(lowerQuery) ||
      repo.topics.some(topic => topic.toLowerCase().includes(lowerQuery)) ||
      repo.language?.toLowerCase().includes(lowerQuery)
    );
  }, [repos]);

  return {
    repos,
    commits,
    profile,
    stats,
    loading,
    error,
    lastUpdate,
    refresh,
    getRepoByName,
    getCommitsForRepo,
    searchRepos,
    isStale: lastUpdate && (Date.now() - lastUpdate.getTime()) > CACHE_DURATION
  };
};

export default useGitHubAPI;
