import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/themeContext";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [theme, setTheme] = useTheme(); // Theme from context
  const [sun, setSun] = useState(true);
  const navigate = useNavigate();

  // Toggle Menu
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Navigate to specific path
  const handlePath = (path: string) => {
    navigate(path);
  };

  // Toggle Theme
  const handleSun = () => {
    setSun(!sun);
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Update the body class based on the theme
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } flex justify-between items-center h-24 min-w-screen px-4`}
    >
      {/* Logo */}
      <div className="logo flex items-center gap-4">
        <img src="../logo.jpeg" alt="logo" className="w-12 h-12" />
        <h1 className="font-bold text-2xl">STORYCRAFT</h1>
      </div>

      {/* Desktop Links */}
      <div className="links flex gap-4 items-center lg:flex sm:hidden font-bold">
        <p className="cursor-pointer hover:bg-purple-400 transition duration-300 px-2 py-2 rounded">
          Home
        </p>

        {/* Hover for Features */}
        <div className="relative group">
          <div className="p-2 cursor-pointer transition duration-300 ease-in-out">
            Hover for Features
          </div>
          <div className="absolute hidden group-hover:block bg-white text-black border rounded shadow-md w-[180px] mt-1 z-10 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-2">
            <div className="p-2 hover:bg-purple-500 cursor-pointer transition duration-300 border-b-2 hover:text-black">
              Plot Generator
            </div>
            <div className="p-2 hover:bg-purple-500 cursor-pointer transition duration-300 border-b-2 hover:text-black">
              Character Builder
            </div>
            <div className="p-2 hover:bg-purple-500 cursor-pointer transition duration-300 border-b-2 hover:text-black">
              Writing Tools
            </div>
            <div className="p-2 hover:bg-purple-500 cursor-pointer transition duration-300 hover:text-black">
              Community
            </div>
          </div>
        </div>

        <p className="cursor-pointer hover:bg-purple-400 rounded transition duration-300 px-2 py-2">
          Pricing
        </p>
        <p className="cursor-pointer hover:bg-purple-400 transition duration-300 rounded px-2 py-2">
          Blogs
        </p>
      </div>

      {/* Buttons */}
      <div className="buttons flex gap-5 sm:hidden sm-md:flex">
        <button
          className="text-xl p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition duration-300 sm-md:hidden md:block"
          onClick={handleSun}
        >
          {sun ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Button
          className="bg-purple-400 transition duration-300 hover:bg-purple-500"
          onClick={() => handlePath("/api/register")}
        >
          Start Your Adventure
        </Button>
        <Button
          className="transition duration-300 hover:bg-gray-700"
          onClick={() => handlePath("/api/login")}
        >
          Login
        </Button>
      </div>

      {/* Hamburger Menu */}
      <div className="menu lg:hidden sm-md:hidden sm:flex mr-5 sm:items-center">
        {!toggle ? (
          <button onClick={handleToggle}>
            <Menu size={30} />
          </button>
        ) : (
          <button onClick={handleToggle}>
            <X size={30} />
          </button>
        )}
      </div>

      {/* Hamburger Menu Dropdown */}
      {toggle && (
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white flex flex-col gap-6 p-6 z-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Menu</h1>
            <button onClick={handleToggle}>
              <X size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <p className="p-3 hover:bg-gray-700 cursor-pointer rounded transition duration-300">
              Home
            </p>
            <div className="p-3 hover:bg-gray-700 cursor-pointer rounded transition duration-300">
              <Select>
                <SelectTrigger className="w-full bg-gray-700 text-white rounded">
                  <SelectValue placeholder="Features" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plot Generator">Plot Generator</SelectItem>
                  <SelectItem value="Character Builder">
                    Character Builder
                  </SelectItem>
                  <SelectItem value="Writing Tools">Writing Tools</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="p-3 hover:bg-gray-700 cursor-pointer rounded transition duration-300">
              Pricing
            </p>
            <p className="p-3 hover:bg-gray-700 cursor-pointer rounded transition duration-300">
              Blogs
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <Button className="bg-purple-400 w-full transition duration-300 hover:bg-purple-500 flex items-center justify-center gap-2 text-teal-50">
              Start Your Adventure
            </Button>
            <Button className="w-full transition duration-300 hover:bg-gray-700 flex items-center justify-center gap-2">
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
