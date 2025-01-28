const express = require('express');
const router = express.Router();
const suggesstionController = require('../controllers/suggestionController.js');
const tokenVerification=require('../Verification/tokenVerification.js')
router.post('/:projectId/new',tokenVerification,suggesstionController.addSuggestion)
router.get('/:projectId/all',tokenVerification,suggesstionController.getSuggestionsOfProject)
router.get('/:projectId/:suggesstionId/allsuggestion',tokenVerification,suggesstionController.getAnswersOfSuggestion)
router.delete('/:projectId/:suggesstionId/delete',tokenVerification,suggesstionController.DeleteSuggestion)
module.exports=router