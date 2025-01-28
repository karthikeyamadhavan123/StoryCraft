import { useAuthStore } from "@/zustand/zustand";
import { useChatStore } from "@/zustand/zustand";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiSettings,
  FiHelpCircle,
  FiActivity,
  FiMenu,
  FiX,
  FiSearch,
  FiPlus,
  FiTrash2,
  FiCopy,
} from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

interface Props {
  _id: string;
  projectId: string;
  text: string;
}

interface ResponseData {
  _id: string;
  answer: string;
}

export default function GeminiDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const name = useAuthStore((state: any) => state.user.username);
  const [history, setHistory] = useState<Props[]>([]);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null);
  const [newChatText, setNewChatText] = useState<string>("");
  const { addSuggestion, removeSuggestion, } = useChatStore();
  const { projectId } = useParams<{ projectId: string }>();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    setIsNewChatOpen(false);
    setSelectedSuggestionId(null);
    setResponses([]);
    setNewChatText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatText(e.target.value);
  };

  const handlePostChat = async () => {
    if (!newChatText.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://storycraft-backend.onrender.com/suggestion/${projectId}/new`,
        { text: newChatText },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const { _id, responseText } = res.data;

        // Immediately refetch the entire chat history
        const historyRes = await axios.get(
          `https://storycraft-backend.onrender.com/suggestion/${projectId}/all`,
          { withCredentials: true }
        );

        // Update Zustand store and local state
        const suggestions = historyRes.data.suggestions;

        // Clear existing suggestions in Zustand store
        const { clearSuggestions, addSuggestion } = useChatStore.getState();
        clearSuggestions();

        // Add updated suggestions to Zustand store
        suggestions.forEach(({ _id, projectId, text }: any) =>
          addSuggestion(_id, projectId, text)
        );

        // Update local state
        setHistory(suggestions);

        // Set responses and selected suggestion
        setResponses([{ _id, answer: responseText }]);
        setSelectedSuggestionId(_id);
        setNewChatText("");
      }
    } catch (error) {
      console.error("Error sending chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Make fetchChatHistory accessible outside of useEffect
  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(
        `https://storycraft-backend.onrender.com/suggestion/${projectId}/all`,
        { withCredentials: true }
      );
      const suggestions = res.data.suggestions as Props[];
      suggestions.forEach(({ _id, projectId, text }) =>
        addSuggestion(_id, projectId, text)
      );
      setHistory(suggestions);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Keep the existing useEffect
  useEffect(() => {
    fetchChatHistory();
  }, [projectId, addSuggestion]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Response copied to clipboard!");
  };



  const handleClick = async (id: string) => {
    try {
      const res = await axios.get(
        `https://storycraft-backend.onrender.com/${projectId}/${id}/allsuggestion`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setResponses(res.data.answers);
        setSelectedSuggestionId(id);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `https://storycraft-backend.onrender.com/suggestion/${projectId}/${id}/delete`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        removeSuggestion(id);
        setHistory((prev) => prev.filter((item) => item._id !== id));
        setResponses([]);
        setSelectedSuggestionId(null);
      }
    } catch (error) {
      console.error("Error deleting suggestion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-merri">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">StoryAi</h1>
          <p className="text-gray-500 text-xs md:text-sm">1.5 Flash</p>
        </div>
        <button
          className="md:hidden text-gray-500"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      <div className="flex flex-col md:grid md:grid-cols-4 flex-grow">
        <aside
          className={`p-4 bg-gray-900 md:block md:h-screen z-50 w-64 md:w-full ${isSidebarOpen ? "block" : "hidden md:block"
            } overflow-y-auto`}
        >
          <button
            className="block w-full text-left bg-gray-800 p-2 rounded-md font-semibold hover:bg-gray-700"
            onClick={handleNewChat}
          >
            <FiPlus className="mr-2" /> New chat
          </button>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-500">Users Recent</li>
            {history.map((item) => (
              <div key={item._id} className="flex items-center space-x-2">
                <button
                  className={`flex-1 bg-gray-800 rounded-lg hover:bg-gray-700 h-24 py-2 px-3 w-full cursor-pointer ${selectedSuggestionId === item._id
                      ? "border-2 border-blue-500"
                      : ""
                    }`}
                  onClick={() => handleClick(item._id)}
                >
                  {item.text}
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
            <li>
              <button className="w-full text-left text-sm text-blue-500">
                Show more
              </button>
            </li>
          </ul>

          <footer className="mt-auto pt-4">
            <div className="flex flex-col items-start text-sm text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-lg" />
                Tadepalligudem, Andhra Pradesh, India
              </div>
              <button className="text-blue-500 underline">
                Update location
              </button>
            </div>
          </footer>
        </aside>

        <main className="col-span-3 p-4 md:p-8 flex flex-col">
          {isNewChatOpen ? (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
                Start a New Chat
              </h2>
              <div className="relative w-full max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="p-4 pl-12 w-full rounded-lg bg-gray-800 placeholder-gray-500 text-white outline-none"
                  value={newChatText}
                  onChange={handleInputChange}
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
              </div>
              <button
                onClick={handlePostChat}
                disabled={isLoading}
                className="mt-4 px-3 text-center py-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-600 w-20 flex justify-center items-center m-auto"
              >
                {isLoading ? "Generating..." : "Send"}
              </button>
              {isLoading && (
                <div className="mt-2 text-center text-gray-500 animate-pulse">
                  Generating answer...
                </div>
              )}
            </div>
          ) : selectedSuggestionId ? (
            <div className="space-y-4">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-4 rounded-lg flex justify-between items-center"
                >
                  <p className="text-white">{response.answer}</p>
                  <button
                    onClick={() => handleCopy(response.answer)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiCopy size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 text-center">
                Hello, {name}
              </h2>
              <button
                className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 m-auto"
                onClick={() => setIsNewChatOpen(true)}
              >
                Start a New Chat
              </button>
            </>
          )}
        </main>

      </div>
      <Link to={`/projects/${projectId}`} className="bg-purple-400 w-40 m-auto px-4 h-10 py-2 text-center">Back to project</Link>

      <footer className="p-4 bg-gray-900 text-gray-500 flex justify-around">
        {[{ icon: FiSettings, text: "Settings" }, { icon: FiHelpCircle, text: "Help" }, { icon: FiActivity, text: "Activity" }].map(
          ({ icon: Icon, text }, index) => (
            <button key={index} className="flex items-center gap-2 hover:text-white">
              <Icon className="text-lg" /> {text}
            </button>
          )
        )}
      </footer>
    </div>
  );
}
