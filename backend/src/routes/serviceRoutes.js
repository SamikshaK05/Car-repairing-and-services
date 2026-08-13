import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin-only protected routes
router.post('/', protect, authorize('ADMIN'), createService);
router.put('/:id', protect, authorize('ADMIN'), updateService);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

export default router;
