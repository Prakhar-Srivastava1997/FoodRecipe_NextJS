"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import classes from './nav-link.module.css'

const NavLink = ({ href, children }) => {
  //usePathname() is used to get the active path/URL.
  const path = usePathname();
  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
};

export default NavLink;
