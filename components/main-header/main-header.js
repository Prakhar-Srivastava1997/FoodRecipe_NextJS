
import React from "react";
import logoImg from "@/assets/logo.png";
//classes is a random name given to the object that we are extracting from below css file
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
import Link from "next/link";

const MainHeader = () => {
  
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          {/* logoImg is an object and path of the image is stored in src attribute of this object */}
          {/* <img src={logoImg.src} alt='Food Plate'/> */}
          {/* below Image component hepls in lazy loading images and also makes them responsive */}
          {/* priority property ensures that the image is loaded on priority avoiding any UI mess in case of loading the image lazily */}
          <Image src={logoImg} alt="Food plate" priority />
          Nextlevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
