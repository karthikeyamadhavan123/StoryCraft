const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController.js');
const tokenVerification=require('../Verification/tokenVerification.js')
// Route for registration with file upload

router.post('/new',tokenVerification,projectController.addNewproject)
router.put('/:projectId/edit', tokenVerification,projectController.Editproject);
router.delete('/:projectId/delete',tokenVerification, projectController.Deleteproject);
router.get('/all',tokenVerification,projectController.Getuserproject)
router.get('/:projectId',tokenVerification,projectController.GetprojectId)
// router.get('/:userId/image',tokenVerification,registerController.getCurrentUserImage);

module.exports = router;