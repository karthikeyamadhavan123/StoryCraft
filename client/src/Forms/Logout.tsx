import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {useAuthStore} from "@/zustand/zustand";
import { Helmet } from "react-helmet-async";
const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { logoutUser } = useAuthStore()
    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await axios.post(
                'https://storycraft-backend.onrender.com/api/logout',
                {},
                {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                logoutUser()
                localStorage.removeItem('r_time')
                localStorage.removeItem('l_time')
                toast.success('Logout Successful');
                navigate('/api/login');
            }


        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message || 'An error occurred during logout');
        }
        finally {
            setLoading(false)
        }
    };

    return (

        <>
            <Helmet>
                <title> Logout |Storycraft</title>
                <meta name='description' content="Forgot-password ,no worries" />
            </Helmet>
            <div className='bg-gray-900'>
                <button onClick={handleLogout} className='border 2px solid bg-fuchsia-400 '>{loading ? <ClipLoader color="#ffffff" loading={loading} size={20} /> : 'Logout'}</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Logout;