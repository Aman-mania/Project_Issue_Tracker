import React, { useState } from 'react';

interface EditProjectFormProps {
  projectId: string;
  currentName: string;
  onUpdateProject: (projectId: string, name: string) => Promise<void>;
  onCancel: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  projectId,
  currentName,
  onUpdateProject,
  onCancel,
}) => {
  const [name, setName] = useState(currentName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      await onUpdateProject(projectId, name);
      onCancel(); // Close the form after successful update
    } catch (err) {
      setError('Failed to update project. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-project-form">
      <h3>Edit Project</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;