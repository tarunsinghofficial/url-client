'use client'
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios"
import { useEmail } from '@/context/EmailContext';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const [fullUrl, setFullUrl] = useState("");
  const [data, setData] = useState([]);
  const { isAuth, setIsAuth } = useAuth();

  const { conEmail } = useEmail()

  const handleSubmit = async () => {

    if (!isAuth) {
      toast.warning('Please login to shorten URLs');
      return;
    }

    if (!fullUrl.trim()) {
      // Display toast message if input is empty
      toast.warning("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post('https://url-server-qa8x.onrender.com/api/url', {
        redirectURL: fullUrl,
        email: conEmail
      })
      setFullUrl("")
      toast.success("Url is shortened")
    } catch (error) {
      console.log(error);
      toast.error("Failed to shorten URL");
    }
  };

  useEffect(() => {
    const fetchShortenedUrls = async () => {
      try {
        const response = await axios.get('https://url-server-qa8x.onrender.com/api/urls');
        console.log("Your data is fetched", response);
        const filteredData = response.data.filter((item) => {
          return item.email === conEmail
        })
        setData(filteredData);
      } catch (error) {
        toast.error('Error fetching data!')
      }
    };
    fetchShortenedUrls();
  }, [conEmail]);


  return (
    <main className="w-full flex flex-col items-center">
      <div className="mt-32 flex flex-col gap-5 items-center p-10 md:p-16 lg:p-24">
        <h2 className="text-3xl md:text-6xl lg:text-8xl dark:text-white text-black font-bold">Create Short URL!</h2>
        <p className="text-md md:text-lg lg:text-xl dark:text-white text-gray-800 text-center">Fast and simple website to create a Shortened URL, easy to remember and share.</p>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-5 items-center justify-center dark:bg-[#191C1F] dark:border-2 border-[#1E293B] bg-white shadow-2xl w-[90%] md:w-[50em] lg:w-[70em] h-auto rounded-lg px-8 py-16">
        <Input value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} type="text" placeholder="http://www.shortenmyurl.com" className="w-[20em] md:w-[30em] lg:w-[50em] dark:bg-[#3D4043]" />
        
        {/* add auth here too */}
        <Button onClick={handleSubmit}>Shorten</Button>

      </div>
      {isAuth ? (
        <div className='mb-24'>
          <h2 className="text-3xl lg:text-5xl text-black dark:text-white font-bold my-10 text-center">History</h2>
          <div className="bg-white dark:bg-[#3D4043] shadow-2xl w-[25em] md:w-[50em] lg:w-[70em] rounded-lg px-2 py-10">
            <Table>
              <TableHeader className="dark:bg-[#3D4043]">
                <TableRow>
                  <TableCell className="font-bold">S.no</TableCell>
                  <TableCell className="font-bold">Original URL</TableCell>
                  <TableCell className="font-bold">Shorten URL</TableCell>
                  <TableCell className="font-bold">Clicks</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((url, index) => (
                  <TableRow key={index} className="dark:bg-[#2B2A2F]">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="hover:underline hover:cursor-pointer max-w-2xl overflow-clip">
                      <a
                        href={`${url.redirectURL}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:cursor-pointer"
                      >{url.redirectURL}

                      </a></TableCell>
                    <TableCell>
                      <a
                        href={`https://url-server-qa8x.onrender.com/api/${url.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:cursor-pointer text-blue-700"
                      >
                        shrtn.me/{url.shortId}
                      </a>
                    </TableCell>
                    <TableCell>{url.totalClicks.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (<div></div>)}
      <ToastContainer />
    </main>
  );
}
