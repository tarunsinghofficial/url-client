'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEmail } from '@/context/EmailContext';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {conEmail, setConEmail} = useEmail();
    const {setIsAuth}  = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://url-server-qa8x.onrender.com/api/auth/login', { email, password });
            setConEmail(response.data.email);
            setIsAuth(true);
            toast.success("Logged in successfully");
            
        } catch (error) {
            toast.error("Error logging in");
        }
    };

    return (
        <form className="h-screen w-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-10 items-center dark:bg-[#191C1F] dark:border-2 border-[#1E293B] bg-white shadow-2xl rounded-lg w-[20em] md:w-[25em] lg:w-[30em] px-8 py-10">
                <h2 className="text-2xl font-bold uppercase">Login</h2>
                <Input
                    type="email"
                    placeholder="youremail@gmail.com"
                    className="w-[18em] md:w-[20em] lg:w-[25em] dark:bg-[#3D4043]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    className="w-[18em] md:w-[20em] lg:w-[25em] dark:bg-[#3D4043]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="w-24">Login</Button>
            </div>
            <ToastContainer /> 
        </form>
    );
}

export default Login;
