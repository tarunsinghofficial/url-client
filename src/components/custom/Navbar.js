"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { useEmail } from "@/context/EmailContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModeToggle } from "../custom/ThemeToggler"

export default function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const { isAuth, setIsAuth } = useAuth();
  const { setConEmail } = useEmail();

  const handleLogout = () => {
    setIsAuth(false);
    setConEmail("");
    localStorage.removeItem("conEmail");
    toast.success("Logged out successfully");
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl w-[90%] mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <HoveredLink href="/">Home</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-lg">
            {isAuth ? (
              <HoveredLink onClick={handleLogout} href="/login">
                Logout
              </HoveredLink>
            ) : (
              <div className="flex flex-col gap-3 text-lg">
                <HoveredLink href="/login">Login</HoveredLink>
                <HoveredLink href="/register">Sign up</HoveredLink>
              </div>
            )}
          </div>
        </MenuItem>
        <ModeToggle />
      </Menu>
    </div>
  );
}
