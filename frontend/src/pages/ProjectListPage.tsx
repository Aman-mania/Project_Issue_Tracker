// Update your ProjectListPage to include search and editing
import React, { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';
import CreateProjectForm from '../components/CreateProjectForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getProjects, createProject, deleteProject, updateProject } from '../services/api';
import { Project } from '../types';

const ProjectListPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // Default items per page

  // Fetch projects on component mount or when search/pagination changes
  useEffect(() => {
    fetchProjects();
  }, [searchTerm, currentPage]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects({
        search: searchTerm || undefined,
        page: currentPage,
        limit: itemsPerPage
      });
      setProjects(response.projects);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (name: string) => {
    try {
      const newProject = await createProject(name);
      setProjects([newProject, ...projects]);
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      // Remove the deleted project from the state
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  const handleUpdateProject = async (projectId: string, name: string) => {
    try {
      const updatedProject = await updateProject(projectId, name);
      // Update the project in the state
      setProjects(
        projects.map(project => 
          project._id === projectId ? updatedProject : project
        )
      );
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="project-list-page">
      <h1>Project Issue Tracker</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="search-container">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search projects..." 
        />
      </div>
      
      <div className="page-content">
        <div className="left-column">
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <ProjectList 
              projects={projects} 
              onDeleteProject={handleDeleteProject}
              onUpdateProject={handleUpdateProject}
            />
          )}
          
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        
        <div className="right-column">
          <CreateProjectForm onCreateProject={handleCreateProject} />
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;