import { Request, Response } from 'express';
import Issue from '../models/Issue';
import { IssueStatus, IssuePriority } from '../models/Issue';
import Project from '../models/Project';

// Get issues for a project (with optional status filter)
// Update the getProjectIssues function to support sorting and pagination
export const getProjectIssues = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { status, sortBy, sortOrder, search, page = '1', limit = '10' } = req.query;
    
    // Convert page and limit to numbers
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;
    
    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Build query
    const query: any = { project: projectId };
    
    // Add status filter if provided
    if (status && Object.values(IssueStatus).includes(status as IssueStatus)) {
      query.status = status;
    }
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort options
    let sort: any = { createdAt: -1 }; // Default sort by creation date (newest first)
    
    if (sortBy) {
      const order = sortOrder === 'asc' ? 1 : -1;
      
      // Validate sortBy field
      const validSortFields = ['title', 'status', 'priority', 'createdAt', 'updatedAt'];
      if (validSortFields.includes(sortBy as string)) {
        sort = { [sortBy as string]: order };
      }
    }

    // Get total count for pagination
    const total = await Issue.countDocuments(query);
    
    // Get paginated issues
    const issues = await Issue.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
      
    res.status(200).json({
      issues,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
};
// Create a new issue for a project
export const createIssue = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, priority } = req.body;

    // Check if project exists
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Issue title is required' });
    }
    
    // Create new issue
    const newIssue = new Issue({
      title,
      description,
      status: status || IssueStatus.TODO,
      priority: priority || IssuePriority.MEDIUM,
      project: projectId,
    });
    
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue', error });
  }
};

// Update an issue
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    const updates = req.body;
    
    // Validate status if provided
    if (updates.status && !Object.values(IssueStatus).includes(updates.status)) {
      return res.status(400).json({ 
        message: 'Invalid status value. Must be one of: ' + Object.values(IssueStatus).join(', ') 
      });
    }
    
    // Validate priority if provided
    if (updates.priority && !Object.values(IssuePriority).includes(updates.priority)) {
      return res.status(400).json({ 
        message: 'Invalid priority value. Must be one of: ' + Object.values(IssuePriority).join(', ') 
      });
    }
    
    // Find and update the issue
    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: 'Error updating issue', error });
  }
};
// Delete an issue
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    
    // Find and delete the issue
    const deletedIssue = await Issue.findByIdAndDelete(issueId);
    
    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue', error });
  }
};