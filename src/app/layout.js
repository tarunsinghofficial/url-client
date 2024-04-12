
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/custom/Navbar"
import { EmailProvider } from "@/context/EmailContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/Theme/ThemeProvider";
import Footer from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URL Shortner",
  description: "Fast and simple website to create a Shortened URL, easy to remember and share. Created by Tarun Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.05] relative flex flex-col`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='min-h-screen flex flex-col'>
            <AuthProvider>
            <div className="fixed pointer-events-none inset-0 h-screen w-screen flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
              <EmailProvider>
                <Navbar />
                <main className='flex-grow'>{children}</main>
              </EmailProvider>
            </AuthProvider>
          </div>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
