import { Router } from 'express';
import { getAllProjects, createProject, getProjectById ,deleteProject, updateProject} from '../controllers/projectController';

const router = Router();


// GET /projects - Get all projects
router.get('/', getAllProjects as any);

// POST /projects - Create a new project
router.post('/', createProject as any);

router.patch('/:id', updateProject as any);

router.delete('/:id', deleteProject as any);

// GET /projects/:id - Get a single project
router.get('/:id', getProjectById as any);

export default router;