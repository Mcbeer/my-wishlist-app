import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

import { BsListCheck, BsGear, BsPerson } from "react-icons/bs";

const iconSettings = {
  size: "2rem",
};

export const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        <NavbarItem
          path="/lists"
          icon={<BsListCheck {...iconSettings} title="Home" />}
        />
        <NavbarItem
          path="/settings"
          icon={<BsGear {...iconSettings} title="Settings" />}
        />
        <NavbarItem
          path="/profile"
          icon={<BsPerson {...iconSettings} title="Profile" />}
        />
      </ul>
    </nav>
  );
};

interface NavbarItemProps {
  path: string;
  icon: ReactNode;
}

const NavbarItem = ({ path, icon }: NavbarItemProps) => {
  return (
    <li>
      <Link to={path}>{icon}</Link>
    </li>
  );
};
