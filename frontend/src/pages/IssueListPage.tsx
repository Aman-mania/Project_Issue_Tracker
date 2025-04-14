// Update your IssueListPage to include search, sorting, and editing
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import IssueTable from '../components/IssueTable';
import CreateIssueForm from '../components/CreateIssueForm';
import StatusFilter from '../components/StatusFilter';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import Pagination from '../components/Pagination';
import { getProjectIssues, createIssue, updateIssue, deleteIssue } from '../services/api';
import { Issue, IssuePriority, IssueStatus } from '../types';

const IssueListPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // Default items per page

  // Fetch issues on component mount and when filters change
  useEffect(() => {
    if (projectId) {
      fetchIssues();
    }
  }, [projectId, statusFilter, searchTerm, sortBy, sortOrder, currentPage]);

  const fetchIssues = async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      const response = await getProjectIssues(
        projectId,
        {
          status: statusFilter as IssueStatus | undefined,
          search: searchTerm || undefined,
          sortBy,
          sortOrder,
          page: currentPage,
          limit: itemsPerPage
        }
      );
      setIssues(response.issues);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      console.error('Error fetching issues:', err);
      setError('Failed to load issues. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIssue = async (
    projectId: string,
    issueData: {
      title: string;
      description?: string;
      status: IssueStatus;
      priority: IssuePriority;
    }
  ) => {
    try {
      const newIssue = await createIssue(projectId, issueData);
      setIssues([newIssue, ...issues]);
    } catch (err) {
      console.error('Error creating issue:', err);
      throw err;
    }
  };

  const handleStatusChange = async (issueId: string, newStatus: IssueStatus) => {
    try {
      const updatedIssue = await updateIssue(issueId, { status: newStatus });
      
      // Update the issue in the local state
      setIssues(
        issues.map((issue) =>
          issue._id === issueId ? updatedIssue : issue
        )
      );
    } catch (err) {
      console.error('Error updating issue status:', err);
      alert('Failed to update issue status. Please try again.');
    }
  };

  const handleDeleteIssue = async (issueId: string) => {
    try {
      await deleteIssue(issueId);
      // Remove the deleted issue from the state
      setIssues(issues.filter(issue => issue._id !== issueId));
    } catch (err) {
      console.error('Error deleting issue:', err);
      throw err;
    }
  };

  const handleUpdateIssue = async (issueId: string, updates: Partial<Issue>) => {
    try {
      const updatedIssue = await updateIssue(issueId, updates);
      // Update the issue in the state
      setIssues(
        issues.map(issue => 
          issue._id === issueId ? updatedIssue : issue
        )
      );
    } catch (err) {
      console.error('Error updating issue:', err);
      throw err;
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page on sort change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!projectId) {
    return <div>Invalid project ID</div>;
  }

  return (
    <div className="issue-list-page">
      <div className="page-header">
        <h1>Project Issues</h1>
        <Link to="/" className="back-link">
          Back to Projects
        </Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="filter-search-container">
        <StatusFilter
          currentStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
        
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search issues..." 
        />
        
        <SortControl
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
      
      <div className="page-content">
        <div className="left-column">
          {loading ? (
            <p>Loading issues...</p>
          ) : (
            <>
              <IssueTable 
                issues={issues} 
                onStatusChange={handleStatusChange}
                onDeleteIssue={handleDeleteIssue}
                onUpdateIssue={handleUpdateIssue}
              />
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
        
        <div className="right-column">
          <CreateIssueForm
            projectId={projectId}
            onCreateIssue={handleCreateIssue}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueListPage;