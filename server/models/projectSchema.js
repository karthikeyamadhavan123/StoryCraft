const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectSchema = new Schema({
    project_name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    genre:{
        type:String,
        enum: [
            "General",
            "Horror",
            "Fantasy",
            "Science Fiction",
            "Mystery",
            "Romance",
            "Thriller",
            "Historical",
            "Non-Fiction",
            "Adventure",
            "Love",
            "Violence"
        ],
        default:"General"
    },
    suggestions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Suggestion' 
      }]
},{timestamps:true})
const Project=mongoose.model('Project', ProjectSchema)
module.exports =Project ;