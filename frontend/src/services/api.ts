import axios from 'axios';
import { Project, Issue, IssueStatus, IssuePriority } from '../types';

// Use the environment variable or default to the proxy URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const updateProject = async (projectId: string, name: string): Promise<Project> => {
  const response = await axios.patch(`${API_URL}/projects/${projectId}`, { name });
  return response.data;
};

// Project API calls
export const getProjects = async (
  options?: {
    search?: string;
    page?: number;
    limit?: number;
  }
): Promise<{ projects: Project[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> => {
  const params = new URLSearchParams();
  
  if (options?.search) {
    params.append('search', options.search);
  }
  
  if (options?.page) {
    params.append('page', options.page.toString());
  }
  
  if (options?.limit) {
    params.append('limit', options.limit.toString());
  }
  
  const url = `${API_URL}/projects${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await axios.get(url);
  return response.data;
};

export const createProject = async (name: string): Promise<Project> => {
  const response = await axios.post(`${API_URL}/projects`, { name });
  return response.data;
};

// Issue API calls
export const getProjectIssues = async (
  projectId: string,
  options?: {
    status?: IssueStatus;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    page?: number;
    limit?: number;
  }
): Promise<{ issues: Issue[]; pagination: { total: number; page: number; limit: number; totalPages: number } }> => {
  let url = `${API_URL}/projects/${projectId}/issues`;
  
  // Add query parameters if provided
  if (options) {
    const params = new URLSearchParams();
    
    if (options.status) {
      params.append('status', options.status);
    }
    
    if (options.sortBy) {
      params.append('sortBy', options.sortBy);
      params.append('sortOrder', options.sortOrder || 'desc');
    }
    
    if (options.search) {
      params.append('search', options.search);
    }
    
    if (options.page) {
      params.append('page', options.page.toString());
    }
    
    if (options.limit) {
      params.append('limit', options.limit.toString());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  }
  
  const response = await axios.get(url);
  return response.data;
};

export const createIssue = async (
  projectId: string,
  issueData: {
    title: string;
    description?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
  }
): Promise<Issue> => {
  const response = await axios.post(
    `${API_URL}/projects/${projectId}/issues`,
    issueData
  );
  return response.data;
};

export const updateIssue = async (
  issueId: string,
  updates: Partial<Issue>
): Promise<Issue> => {
  const response = await axios.patch(`${API_URL}/issues/${issueId}`, updates);
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await axios.delete(`${API_URL}/projects/${projectId}`);
};

export const deleteIssue = async (issueId: string): Promise<void> => {
  await axios.delete(`${API_URL}/issues/${issueId}`);
};

