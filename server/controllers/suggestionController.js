const Suggestion = require('../models/suggesstionSchema');
const Project = require('../models/projectSchema');
const generate = require('../util/gemini')
const Answer = require('../models/answerSchema')
const addSuggestion = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { text } = req.body;

        if (!projectId || !text) {
            return res.status(400).json({ success: false, message: 'Project ID and text are required' });
        }

        // Find the project
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Create a new suggestion
        const suggestion = new Suggestion({
            projectId,
            text,
        });
        await suggestion.save();
        const _id = suggestion._id
        // Generate AI response for the text
        const result = await generate(text);
        const responseText = result.response.candidates[0].content.parts[0].text;

        // Create a new answer and link it to the suggestion
        const answer = new Answer({
            answer: responseText,
            suggesstion_id: suggestion._id,
            project_id: projectId
        });
        await answer.save();

        // Add the answer to the suggestion's `answers` field
        suggestion.answers.push(answer._id);
        await suggestion.save();

        // Link the suggestion to the project
        project.suggestions.push(suggestion._id);
        await project.save();

        return res.status(201).json({
            success: true,
            message: 'Suggestion added successfully',
            _id,
            responseText
        });
    } catch (error) {
        console.error('Error adding suggestion:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getSuggestionsOfProject = async (req, res) => {
    try {
        const { projectId } = req.params


        if (!projectId) {
            return res.status(400).json({ success: false, message: 'Project ID and text are required' });
        }

        // Find the project
        const suggestions = await Suggestion.find({ projectId: projectId })
            .select('_id text projectId');


        if (!suggestions) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        return res.status(201).json({
            success: true,
            message: 'Suggestion fecthed successfully',
            suggestions,

        });
    } catch (error) {
        console.error('Error adding suggestion:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
const getAnswersOfSuggestion = async (req, res) => {
    try {
        const { projectId, suggesstionId } = req.params;

        if (!projectId) {
            return res.status(400).json({ success: false, message: 'projectId ID is required' });
        }

        if (!suggesstionId) {
            return res.status(400).json({ success: false, message: 'Suggestion ID is required' });
        }

        // Find all answers linked to the given suggestion ID
        const answers = await Answer.find({ suggesstion_id: suggesstionId }).select('answer')

        if (!answers || answers.length === 0) {
            return res.status(404).json({ success: false, message: 'No answers found for the given suggestion ID' });
        }

        return res.status(200).json({
            success: true,
            message: 'Answers fetched successfully',
            answers,
        });
    } catch (error) {
        console.error('Error fetching answers:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
const DeleteSuggestion = async (req, res) => {
    try {

        const { userId } = req.userId
        const { projectId, suggesstionId } = req.params
        if (!projectId) {
            return res.status(400).send('projectId is required');
        }
        if (!suggesstionId) {
            return res.status(400).send('suggesstionId is required');
        }
        const delete_project = await Project.findById(projectId)
        const delete_suggestion = await Suggestion.findById(suggesstionId)
        if (!delete_suggestion) {
            return res.status(404).send('suggestion not found');
        }
        if (String(delete_project.owner._id) !== String(userId)) {
            return res.status(401).send('You are not allowed to delete the suggestion');
        }
        await Answer.deleteMany({
            suggesstion_id: suggesstionId
        });
        await Project.updateMany({
            suggestions: suggesstionId
        }, { $pull: { suggestions: suggesstionId } }
        );

        await delete_suggestion.deleteOne()
        return res.status(200).json({ success: true, message: 'Project Deleted Successfully' })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
module.exports = { addSuggestion, getSuggestionsOfProject, getAnswersOfSuggestion, DeleteSuggestion } 