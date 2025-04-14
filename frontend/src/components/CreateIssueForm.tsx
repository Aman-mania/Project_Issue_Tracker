import React, { useState } from 'react';
import { IssueStatus, IssuePriority } from '../types';

interface CreateIssueFormProps {
  projectId: string;
  onCreateIssue: (
    projectId: string,
    issueData: {
      title: string;
      description?: string;
      status: IssueStatus;
      priority: IssuePriority;
    }
  ) => Promise<void>;
}

const CreateIssueForm: React.FC<CreateIssueFormProps> = ({
  projectId,
  onCreateIssue,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<IssueStatus>(IssueStatus.TODO);
  const [priority, setPriority] = useState<IssuePriority>(IssuePriority.MEDIUM);
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
      await onCreateIssue(projectId, {
        title,
        description: description || undefined,
        status,
        priority,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setStatus(IssueStatus.TODO);
      setPriority(IssuePriority.MEDIUM);
    } catch (err) {
      setError('Failed to create issue. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-issue-form">
      <h2>Create New Issue</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter issue title"
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
            placeholder="Enter issue description (optional)"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value;
              if (Object.values(IssueStatus).includes(newStatus as IssueStatus)) {
                setStatus(newStatus as IssueStatus);
              }
            }}
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
            onChange={(e) => {
              const newPriority = e.target.value;
              if (Object.values(IssuePriority).includes(newPriority as IssuePriority)) {
                setPriority(newPriority as IssuePriority);
              }
            }}
            disabled={isSubmitting}
          >
            {Object.values(IssuePriority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Issue'}
        </button>
      </form>
    </div>
  );
};

export default CreateIssueForm;