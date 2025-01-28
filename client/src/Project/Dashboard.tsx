  import  { useEffect, useState } from 'react';
  import { LucideIcon, Menu, X, Home, Settings, Users, Car, FolderKanban, ArrowBigDownDash } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import {useAuthStore} from '@/zustand/zustand';
  import axios from 'axios';
  type DropDown = {
    label: string;
    href: string;
  };

  type MenuProps = {
    icon: LucideIcon;
    label: string;
    href: string;
    id: number;
    dropdown: DropDown[] | null;
  };
  type Project = {
    project_name: string;
    content: string;
    _id: string;
    genre: string;
  };

  const Sidebar = () => {
    useEffect(() => {
      const fetchMyProjects = async () => {
        try {
          const res = await axios.get('https://storycraft-backend.onrender.com/project/all', { withCredentials: true })
          setProject(res.data.project)
        } catch (error) {
          console.log(error);
        }
      }
      fetchMyProjects()

    }, [])
    const [project, setProject] = useState<Project[]>([])
    
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdowns, setActiveDropdowns] = useState<Record<number, boolean>>({});
    const username = useAuthStore((state: any) => state.user.username)
    const menuItems: MenuProps[] = [
      {
        icon: Home,
        label: 'Home',
        href: '/',
        id: 1,
        dropdown: null
      },
      {
        icon: FolderKanban,
        label: 'My Projects',
        href: '/',
        id: 2,
        dropdown: [
          ...project.map((proj) => ({
            label: proj.project_name,
            href: `/projects/${proj._id}`
          }))
        ]
      },
      {
        icon: Users,
        label: 'Users',
        href: '/users',
        id: 3,
        dropdown: [
          { label: 'User Management', href: '/users/manage' },
          { label: 'Roles & Permissions', href: '/users/roles' }
        ]
      },
      {
        icon: Car,
        label: 'Analytics',
        href: '/analytics',
        id: 4,
        dropdown: [
          { label: 'Performance', href: '/analytics/performance' },
          { label: 'User Insights', href: '/analytics/users' }
        ]
      },
      {
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        id: 5,
        dropdown: [
          { label: 'Account Settings', href: '/settings/account' },
          { label: 'Application Preferences', href: '/settings/preferences' }
        ]
      }
    ];

    const toggleDropdown = (itemId: number) => {
      setActiveDropdowns(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    };

    return (
      <div className='font-merri relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 z-40
        `}>
          <div className="p-6 border-b border-gray-700 flex items-center gap-2">
            <img src="/logo.jpeg" alt="" className='w-10 h-10' />
            <h2 className="text-2xl font-bold text-center">Dashboard</h2>
          </div>

          <nav className="p-4">
            <div className='flex flex-col gap-2 justify-center'>
              {menuItems.map((item) => (
                <div key={item.id} className='flex flex-col'>
                  <div className='flex items-center'>
                    <Link
                      to={item.href}
                      className="flex-grow flex items-center p-3 hover:bg-gray-700 rounded transition-colors"
                    >
                      <item.icon className="mr-3" size={20} />
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <ArrowBigDownDash />
                      </button>
                    )}
                  </div>

                  {item.dropdown && activeDropdowns[item.id] && (
                    <div className="ml-8 bg-gray-700 rounded">
                      {item.dropdown.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.href}
                          className="block p-2 hover:bg-gray-600 rounded border-b"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
          <div className="profile absolute bottom-0 bg-gray-800 w-full h-16 flex justify-center items-center px-2 rounded-md shadow-2xl">
            <div className="container flex justify-around items-center">
              <div className="logo">
                <h1 className='text-2xl text-center w-7 px-1 rounded-2xl bg-red-500'>{username.toUpperCase().charAt(0)}</h1>
              </div>
              <div className="name">
                <p>{username}</p>

              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          />
        )}
      </div>

    );
  };

  export default Sidebar;