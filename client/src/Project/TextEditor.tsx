import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useProjectStore } from '@/zustand/zustand';
const TextEditor = () => {  
  const [modal, setModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`http://localhost:8080/project/new`, { projectName, content, genre }, { withCredentials: true });
      if (res.status === 201) {
        toast.success('Project Created')
        const newProject = res.data.project; // The newly created project from the backend
       useProjectStore.getState().addProject(newProject)
        setModal(false);
        
      }

    } catch (error:any) {
      console.error(error);
      toast.error("An error occured during creating project")
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex h-full">
  
        <div className="flex-1 flex justify-center items-center">
          <Button
            className="bg-purple-400 transition duration-300 hover:bg-purple-500"
            onClick={() => setModal(true)}
          >
            Create New Project
          </Button>
        </div>
    

      {modal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 font-merri">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-400 focus:border-purple-400"
                  required
                  name='projectName'
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-400 focus:border-purple-400"
                  name='content'
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-400 focus:border-purple-400"
                  name='genre'
                />
              </div>
              {
                loading ? <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-400 text-white font-medium rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <ClipLoader/>
              </button>: <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-400 text-white font-medium rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Create Project
              </button>
              }
             
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TextEditor;