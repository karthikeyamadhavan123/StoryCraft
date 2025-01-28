const Answer = require("../models/answerSchema");
const Project = require("../models/projectSchema");
const Suggestion = require("../models/suggesstionSchema");

const addNewproject = async (req, res) => {
    try {
        const { projectName, content, genre } = req.body;
        const { userId } = req.userId; // Assuming `userId` is stored in `req.user`

        // Validate required fields
        if (!projectName) {
            return res.status(400).send('Project name is required');
        }
        if (!content) {
            return res.status(400).send('Content is required');
        }

        // Create a new project
        const new_project = await Project.create({
            project_name: projectName,
            content: content,
            owner: userId,
            genre: genre || "General", // Default to "General" if genre is not provided
        });

        // Return the newly created project in the response
        return res.status(201).json({
            success: true,
            message: 'Project Created Successfully',
            project: {
                _id: new_project._id, // Include the project ID
                project_name: new_project.project_name,
                content: new_project.content,
                genre: new_project.genre,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const Editproject = async (req, res) => {
    try {
        const { project_name, content } = req.body
        const {userId} = req.userId
        const{projectId} = req.params
        
        if (!projectId) {
            return res.status(400).send('projectId is required');
        }
        const edit_project = await Project.findById(projectId)
        if(!edit_project){
            return res.status(404).send('project not found');
        }
        if(String(edit_project.owner._id)!== String(userId)){
            return res.status(401).send('You are not allowed to edit the project');
        }
        if (project_name) {
            edit_project.project_name = project_name;
          }
          if (content) {
            edit_project.content = content;
          }
      
          await edit_project.save();
          return res.status(200).json({
            success: true,
            message: 'Project Edited Successfully',
            project_name: edit_project.project_name,
            content: edit_project.content,
          });
            
          

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const Deleteproject = async (req, res) => {
    try {
       
        const {userId} = req.userId
        const{projectId} = req.params
        if (!projectId) {
            return res.status(400).send('projectId is required');
        }
        const delete_project = await Project.findById(projectId)
        if(!delete_project){
            return res.status(404).send('project not found');
        }
        if(String(delete_project.owner._id)!== String(userId)){
            return res.status(401).send('You are not allowed to edit the project');
        }
        await Answer.deleteMany({
            projectId:projectId
        });
        await Suggestion.deleteMany({
            projectId:projectId
        });
        
        await delete_project.deleteOne()
        return res.status(200).json({success:true,message:'Project Deleted Successfully'})

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
const Getuserproject = async (req, res) => {
    try {
        const {userId} = req.userId
       const projects = await Project.find({owner:userId})
       if(projects.length > 0){
        return res.status(200).json({success:true,message:'Project Fetched Successfully',project:projects})
       }
        

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
const GetprojectId = async (req, res) => {
    try {
        const {projectId} = req.params
       const projects = await Project.findById(projectId).select('project_name content owner')
     
        return res.status(200).json({success:true,message:'Project Fetched Successfully',projects})
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}
module.exports={
    addNewproject,
    Editproject,
    Deleteproject,
    Getuserproject,
    GetprojectId
}