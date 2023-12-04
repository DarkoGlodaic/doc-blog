import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const storedSliderPosition = localStorage.getItem("sliderPosition");

    const [, setMintyTheme] = useState(true);
    const [sliderPosition, setSliderPosition] = useState(storedSliderPosition === 'checked');


    useEffect(() => {
        // Retrieve the theme preference from localStorage
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setMintyTheme(storedTheme === 'minty');
          // Apply the theme immediately on initial render
          document.body.setAttribute('data-theme', storedTheme === 'minty' ? 'root' : 'pink-theme');
        }
      }, []);

    const toggleTheme = () => {
        setMintyTheme((prevTheme) => {
            const newTheme = !prevTheme;
            // Add/remove the 'pink-theme' class on the body element based on the current theme
            document.body.setAttribute("data-theme", newTheme ? "root" : "pink-theme")
            // Store theme preference in localStorage
            localStorage.setItem("theme", newTheme ? "minty" : "pink");
            return newTheme;
          });

          setSliderPosition((prevPosition) => {
            const newPosition = !prevPosition;
            // Store slider position in localStorage
            localStorage.setItem("sliderPosition", newPosition ? "checked" : "");
            return newPosition;
        });
    };

    
  

    return (
        <nav className="navbar">
            <h1>The Minty Blog 🍵</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" className="create-link">New Blog</Link>
                <label className="switch">
                    <input type="checkbox" onChange={toggleTheme} checked={sliderPosition}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </nav>
    );
}
 
export default Navbar;