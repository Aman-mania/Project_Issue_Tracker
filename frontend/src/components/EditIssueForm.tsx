import React, { useState } from 'react';
import { Issue, IssueStatus, IssuePriority } from '../types';

interface EditIssueFormProps {
  issue: Issue;
  onUpdateIssue: (issueId: string, updates: Partial<Issue>) => Promise<void>;
  onCancel: () => void;
}

const EditIssueForm: React.FC<EditIssueFormProps> = ({
  issue,
  onUpdateIssue,
  onCancel,
}) => {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description || '');
  const [status, setStatus] = useState<IssueStatus>(issue.status);
  const [priority, setPriority] = useState<IssuePriority>(issue.priority);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Issue title is required');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onUpdateIssue(issue._id, {
        title,
        description: description || undefined,
        status,
        priority,
      });
      onCancel(); // Close the form after successful update
    } catch (err) {
      setError('Failed to update issue. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-issue-form">
      <h3>Edit Issue</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as IssueStatus)}
            disabled={isSubmitting}
          >
            {Object.values(IssueStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as IssuePriority)}
            disabled={isSubmitting}
          >
            {Object.values(IssuePriority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Issue'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIssueForm;