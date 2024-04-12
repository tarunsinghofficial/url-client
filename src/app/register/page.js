'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://url-server-qa8x.onrender.com/api/auth/register', { email: email, password:password });
            toast.success("Registered successfully");
        } catch (error) {
            toast.error("Error registering");
        }
    }

    return (
        <form class="h-screen w-full flex flex-col items-center justify-center">
            <div className='flex flex-col gap-10 items-center dark:bg-[#191C1F] dark:border-2 border-[#1E293B] bg-white shadow-2xl rounded-lg w-[20em] md:w-[25em] lg:w-[30em] px-8 py-10'>
                <h2 className="text-2xl font-bold uppercase">Sign up</h2>

                <Input type="email" placeholder="youremail@gmail.com" className="dark:bg-[#3D4043] w-[18em] md:w-[20em] lg:w-[25em]" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" className="dark:bg-[#3D4043] w-[18em] md:w-[20em] lg:w-[25em]" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleRegister} className="w-24">Register</Button>
            </div>
            <ToastContainer />
        </form>

    )
}

export default Register