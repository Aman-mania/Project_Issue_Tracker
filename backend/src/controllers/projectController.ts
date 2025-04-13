import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';
import Issue from '../models/Issue';

// Get all projects with pagination
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { search, page = '1', limit = '10' } = req.query;
    
    // Convert page and limit to numbers
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;
    
    let query = {};
    
    // Add search filter if provided
    if (search) {
      query = { 
        name: { $regex: search, $options: 'i' } // Case-insensitive search
      };
    }
    
    // Get total count for pagination
    const total = await Project.countDocuments(query);
    
    // Get paginated projects
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    res.status(200).json({
      projects,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};
// Create a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    
    const newProject = new Project({ name });
    const savedProject = await newProject.save();
    
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Find and delete the project
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Also delete all issues associated with this project
    await Issue.deleteMany({ project: id });
    
    res.status(200).json({ message: 'Project and associated issues deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};