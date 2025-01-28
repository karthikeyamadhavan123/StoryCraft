const mongoose = require('mongoose')
const { Schema } = mongoose

const AnswerSchema = new Schema({
    answer: {
        type: String,
        default: " "
    },
    suggesstion_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion',
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion',
        required: true
    }
})
const Answer=mongoose.model('Answer', AnswerSchema)
module.exports =Answer ;