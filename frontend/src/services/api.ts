import { useAuthStore } from '../store/useAuthStore';

const API_BASE = '/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'API request failed' }));
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (credentials: any) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (data: any) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    me: () => fetchWithAuth('/auth/me'),
  },

  candidate: {
    getProfile: () => fetchWithAuth('/candidates/profile'),
    updateProfile: (data: any) => fetchWithAuth('/candidates/profile', { method: 'POST', body: JSON.stringify(data) }),
    uploadResume: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return fetchWithAuth('/candidates/resume/upload', {
        method: 'POST',
        body: formData,
      });
    },
    getMatches: (filter?: any) => fetchWithAuth('/candidates/matches', { method: 'POST', body: JSON.stringify(filter || {}) }),
  },

  jobs: {
    getAll: () => fetchWithAuth('/jobs'),
    getRecruiterJobs: () => fetchWithAuth('/jobs/my-jobs'),
    getById: (id: string) => fetchWithAuth(`/jobs/${id}`),
    create: (data: any) => fetchWithAuth('/jobs', { method: 'POST', body: JSON.stringify(data) }),
    getTopCandidates: (id: string) => fetchWithAuth(`/jobs/${id}/matches`),
  },

  applications: {
    apply: (jobId: string, coverNote: string) =>
      fetchWithAuth('/applications/apply', { method: 'POST', body: JSON.stringify({ jobId, coverNote }) }),
    updateStatus: (id: string, status: string, notes?: string) =>
      fetchWithAuth(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }) }),
    getForJob: (jobId: string) => fetchWithAuth(`/applications/job/${jobId}`),
    getMyApplications: () => fetchWithAuth('/applications/my-applications'),
  },

  analytics: {
    getSummary: () => fetchWithAuth('/analytics/summary'),
  },

  notifications: {
    getAll: () => fetchWithAuth('/notifications'),
    markRead: (id: string) => fetchWithAuth(`/notifications/${id}/read`, { method: 'PATCH' }),
  },
};
