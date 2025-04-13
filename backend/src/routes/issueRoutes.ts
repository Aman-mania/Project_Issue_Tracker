import { Router } from 'express';
import { getProjectIssues, createIssue, updateIssue, deleteIssue } from '../controllers/issueController';

const router = Router();

// GET /projects/:projectId/issues - Get all issues for a project
router.get('/projects/:projectId/issues', getProjectIssues as any);

// POST /projects/:projectId/issues - Create a new issue for a project
router.post('/projects/:projectId/issues', createIssue as any);

// PATCH /issues/:issueId - Update an issue
router.patch('/issues/:issueId', updateIssue as any);

// DELETE /issues/:issueId - Delete an issue
router.delete('/issues/:issueId', deleteIssue as any);

export default router;