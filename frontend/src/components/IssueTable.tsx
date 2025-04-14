import React, { useState } from 'react';
import { Issue, IssueStatus } from '../types';
import EditIssueForm from './EditIssueForm';

interface IssueTableProps {
  issues: Issue[];
  onStatusChange: (issueId: string, newStatus: IssueStatus) => Promise<void>;
  onDeleteIssue: (issueId: string) => Promise<void>;
  onUpdateIssue: (issueId: string, updates: Partial<Issue>) => Promise<void>;
}

const IssueTable: React.FC<IssueTableProps> = ({ 
  issues, 
  onStatusChange, 
  onDeleteIssue,
  onUpdateIssue
}) => {
  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);

  const handleDelete = async (issueId: string) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await onDeleteIssue(issueId);
      } catch (error) {
        console.error('Error deleting issue:', error);
        alert('Failed to delete issue. Please try again.');
      }
    }
  };

  const handleEdit = (issueId: string) => {
    setEditingIssueId(issueId);
  };

  return (
    <div className="issue-table">
      <h2>Issues</h2>
      {issues.length === 0 ? (
        <p>No issues found. Create a new issue to get started.</p>
      ) : (
        <>
          {editingIssueId ? (
            <EditIssueForm
              issue={issues.find(issue => issue._id === editingIssueId)!}
              onUpdateIssue={onUpdateIssue}
              onCancel={() => setEditingIssueId(null)}
            />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue._id}>
                    <td>{issue.title}</td>
                    <td>{issue.description || 'N/A'}</td>
                    <td>{issue.status}</td>
                    <td>{issue.priority}</td>
                    <td className="action-buttons">
                      <select
                        value={issue.status}
                        onChange={(e) => 
                          onStatusChange(issue._id, e.target.value as IssueStatus)
                        }
                      >
                        {Object.values(IssueStatus).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button 
                        className="edit-button"
                        onClick={() => handleEdit(issue._id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(issue._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default IssueTable;