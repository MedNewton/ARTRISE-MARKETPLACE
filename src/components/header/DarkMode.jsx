import React from 'react';
import { Link } from 'react-router-dom'
import imgsun from '../../assets/images/icon/sun.png'
import imgmoon from '../../assets/images/icon/moon.png'
import Dropdown from "react-bootstrap/Dropdown";
import {useMediaQuery} from "react-responsive";

const DarkMode = () => {

    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})

    let clickedClass = "clicked"
    let x = 0
    const body = document.body
    const lightTheme = "light"
    const darkTheme = "is_dark"
    const themeBtnIcon = document.getElementById("themeBtnIcon");
    let theme = lightTheme;

    
    if (localStorage) {
        theme = localStorage.getItem("theme")
    }
    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme)
    } else {
        body.classList.add(darkTheme)
    }

    const switchTheme = e => {
        e.preventDefault();
        console.log(theme)
        if (theme === darkTheme) {
            document.getElementById('themeIcon').src = imgsun;
            console.log(document.getElementById('themeIcon').src)
            //themeBtnIcon.src = imgsun
            body.classList.replace(darkTheme, lightTheme)
            e.target.classList.remove(clickedClass)
            localStorage.setItem("theme", "light")
            theme = lightTheme
            
        } else {
            document.getElementById('themeIcon').src = imgmoon;
            console.log(document.getElementById('themeIcon').src)
            
            //themeBtnIcon.src = imgmoon
            body.classList.replace(lightTheme, darkTheme)
            e.target.classList.add(clickedClass)
            localStorage.setItem("theme", "is_dark")
            theme = darkTheme
            
        }
    }
    return (
        <Dropdown>
        <div className={isDeviceMobile ? "mode_switcher_mobile_version" : "mode_switcher"}>
            {!isDeviceMobile &&<h6>Dark mode <strong>Available</strong></h6>}

        <Link to="" 
            onClick={e => switchTheme(e)}  >
            <img id="themeIcon" src={imgsun} alt="" />
        </Link>
    </div>
        </Dropdown>
    );
}

export default DarkMode;
