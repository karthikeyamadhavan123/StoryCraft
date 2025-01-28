import React, { useEffect } from 'react';
import Sidebar from './Dashboard';
import TextEditor from './TextEditor';
import checkSessionExpiry from '@/Protected/sessionExpiry';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const check =checkSessionExpiry()
    if(check){
      navigate('/api/login')
      return;
    }
  },[navigate])
  
  
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            <div className="flex-1 overflow-auto">
              <TextEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;