import express from 'express';
import {
  getServiceCenters,
  getServiceCenterById,
  createServiceCenter,
  updateServiceCenter,
  deleteServiceCenter,
} from '../controllers/serviceCenterController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServiceCenters);
router.get('/:id', getServiceCenterById);

// Admin & Service Manager protected routes
router.post('/', protect, authorize('ADMIN', 'SERVICE_MANAGER'), createServiceCenter);
router.put('/:id', protect, authorize('ADMIN', 'SERVICE_MANAGER'), updateServiceCenter);
router.delete('/:id', protect, authorize('ADMIN', 'SERVICE_MANAGER'), deleteServiceCenter);

export default router;
