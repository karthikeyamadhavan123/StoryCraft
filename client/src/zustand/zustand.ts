import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    username: string;
    userId: string;
    isLogged: boolean;
}

interface User1 {
    user: UserState;
    registerUser: (username: string, userId: string) => void;
    loginUser: (username: string, userId: string) => void;
    logoutUser: () => void;
}

interface Suggestion {
    id: string;
    projectId: string;
    text: string;
}
type Project = {
    project_name: string;
    content: string;
    _id: string;
    genre: string;
  };
  
  interface ProjectStore {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    clearProjects: () => void;
  }

interface ChatStore {
    suggestion: Suggestion[];
    addSuggestion: (id: string, projectId: string, text: string) => void;
    removeSuggestion: (id: string) => void;
    clearSuggestions: () => void; // Add this line
}
const customStorage = {
    getItem: (name: string) => {
        const storedValue = localStorage.getItem(name);
        return storedValue ? JSON.parse(storedValue) : null;
    },
    setItem: (name: string, value: any) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

const useAuthStore = create<User1>()(
    persist(
        (set) => ({
            user: {
                username: '',
                userId: '',
                isLogged: false,
            },
            registerUser: (username, userId) => {
                set(() => ({
                    user: { username, userId, isLogged: true },
                }));
            },
            loginUser: (username, userId) => {
                set(() => ({
                    user: { username, userId, isLogged: true },
                }));
            },
            logoutUser: () => {
                set(() => ({
                    user: { username: '', userId: '', isLogged: false },
                }));
            },
        }),
        {
            name: 'auth-storage', // Key in localStorage
            storage: customStorage, // Use customStorage wrapper
        }
    )
);

const useChatStore = create<ChatStore>()(
    (set) => ({
        suggestion: [],
        addSuggestion: (id: string, projectId: string, text: string) => {
            set((state) => ({
                suggestion: [...state.suggestion, { id, projectId, text }],
            }));
        },
        removeSuggestion: (id: string) => {
            set((state) => ({
                suggestion: state.suggestion.filter(
                    (suggestion) => suggestion.id !== id
                ),
            }));
        },
        // Add a new method to clear all suggestions
        clearSuggestions: () => {
            set({ suggestion: [] });
        }
    })
);
const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
    addProject: (project) =>
      set((state) => ({
        projects: [...state.projects, project],
      })),
    clearProjects: () => set({ projects: [] }),
  }));
export { useAuthStore, useChatStore,useProjectStore };
