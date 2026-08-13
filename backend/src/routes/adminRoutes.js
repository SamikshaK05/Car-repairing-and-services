import express from 'express';
import {
  getAdminDashboard,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
  updateAdminUserStatus,
  deleteAdminUser,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect & authorize('ADMIN') middleware to all admin routes
router.use(protect);
router.use(authorize('ADMIN'));

// Dashboard route
router.get('/dashboard', getAdminDashboard);

// User Management routes
router.get('/users', getAdminUsers);
router.get('/users/:id', getAdminUserById);
router.put('/users/:id', updateAdminUser);
router.patch('/users/:id/status', updateAdminUserStatus);
router.delete('/users/:id', deleteAdminUser);

export default router;
