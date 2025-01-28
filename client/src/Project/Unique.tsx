import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ClipLoader } from 'react-spinners';
import { Edit, Trash, Sparkles } from 'lucide-react';
import checkSessionExpiry from '@/Protected/sessionExpiry';
import useProject from '@/useHooks/useProject';
import axios from 'axios';

const Unique = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const url = `http://localhost:8080/project/${projectId}`;

  useEffect(() => {
    const check = checkSessionExpiry();
    if (check) {
      navigate('/api/login');
      return;
    }
  }, [navigate]);

  const { project, loading, error: fetchError, setProject } = useProject(url);
  const [content, setContent] = useState<string>('');
  const [projectName, setProjectName] = useState<string>(project?.project_name || 'Untitled Project');
  const [isEdited, setIsEdited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  

  useEffect(() => {
    if (project?.content) {
      setContent(project.content);
    }
    if (project?.project_name) {
      setProjectName(project.project_name);
    }
  }, [project]);

  useEffect(() => {
    setIsEdited(content !== project?.content || projectName !== project?.project_name);
  }, [content, projectName, project?.content, project?.project_name]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    try {
      setError(null);
      const response = await axios.put(
        `http://localhost:8080/project/${projectId}/edit`,
        { content, project_name: projectName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setProject((prev) => ({
        ...prev,
        content,
        project_name: projectName,
      }));
      setIsEdited(false);
      setEditingName(false);
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || 'An unexpected error occurred.'
      );
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/project/${projectId}/delete`, {
        withCredentials: true,
      });
      navigate('/project');
      alert('Project Deleted') // Redirect after successful deletion
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || 'Failed to delete project.'
      );
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen text-white">
          <ClipLoader size={30} />
        </div>
      ) : (
        <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-4">
          {fetchError && (
            <div className="bg-red-600 text-white p-2 rounded-md mb-4">
              Failed to load project: {fetchError}
            </div>
          )}
          {error && (
            <div className="bg-red-600 text-white p-2 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Project Name */}
          <div className="w-full max-w-4xl mb-4">
            {editingName ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="text-2xl font-bold bg-gray-800 text-white rounded-lg px-2 py-1 flex-grow"
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{projectName}</h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center"
                >
                  <Edit className="mr-2" /> Edit
                </button>
              </div>
            )}
          </div>

          {/* Text Area and Buttons Container */}
          <div className="w-full max-w-4xl relative">
            {/* Text Area */}
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContentChange}
              placeholder="Write Your Content"
              className="h-96 bg-gray-900 text-white rounded-lg mb-4"
            />

            {/* Save and Delete Buttons */}
            <div className="flex space-x-4 mt-16">
              <button
                onClick={handleSave}
                disabled={!isEdited}
                className={`flex items-center px-6 py-2 rounded-lg font-bold ${
                  isEdited ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                } text-white`}
              >
                <Edit className="mr-2" /> Save Changes
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center px-6 py-2 rounded-lg font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="mr-2" /> Delete
              </button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-xl mb-4">Are you sure you want to delete this project?</h2>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 rounded-lg text-white"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions Button */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6">
            <button
              onClick={() =>navigate(`/chat/${projectId}`)}
              className="flex items-center px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg"
            >
              <Sparkles className="mr-2" /> AI Suggestions
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Unique;