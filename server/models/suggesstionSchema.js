const mongoose = require('mongoose')
const { Schema } = mongoose
const SuggestionSchema = new Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    text: { type: String, required: true }, 
    createdByAI: { type: Boolean, default: true }, 
    answers:[{
     type: mongoose.Schema.Types.ObjectId, ref: 'Answer',
    }],
    createdAt: { type: Date, default: Date.now },
});

const Suggestion = mongoose.model('Suggestion', SuggestionSchema);
module.exports=Suggestion
