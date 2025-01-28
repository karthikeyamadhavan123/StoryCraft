import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuthStore} from '../zustand/zustand'; // Import your Zustand store

const Protected = ({ Component }: { Component: React.ElementType }) => {
    const isLoggedIn = useAuthStore((state:any) => state.user.isLogged); // Access Zustand state
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/api/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <Component />
        </div>
    );
};

export default Protected;
