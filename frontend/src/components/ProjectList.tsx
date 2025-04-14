import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import EditProjectForm from './EditProjectForm';

interface ProjectListProps {
  projects: Project[];
  onDeleteProject: (projectId: string) => Promise<void>;
  onUpdateProject: (projectId: string, name: string) => Promise<void>;
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  onDeleteProject,
  onUpdateProject
}) => {
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const handleDelete = async (projectId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    
    if (window.confirm('Are you sure you want to delete this project? This will also delete all associated issues.')) {
      try {
        await onDeleteProject(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleEdit = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingProjectId(projectId);
  };

  return (
    <div className="project-list">
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found. Create a new project to get started.</p>
      ) : (
        <ul className="project-items">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              {editingProjectId === project._id ? (
                <EditProjectForm
                  projectId={project._id}
                  currentName={project.name}
                  onUpdateProject={onUpdateProject}
                  onCancel={() => setEditingProjectId(null)}
                />
              ) : (
                <div className="project-item-content">
                  <Link to={`/projects/${project._id}`} className="project-link">
                    {project.name}
                  </Link>
                  <div className="project-actions">
                    <button 
                      className="edit-button"
                      onClick={(e) => handleEdit(project._id, e)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={(e) => handleDelete(project._id, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;