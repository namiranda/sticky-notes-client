import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    let response = await axios.get(
      'https://topiksapi.herokuapp.com/api/users/currentuser',
      {
        withCredentials: true,
      }
    );

    const links = [
      !response.data.currentUser && { label: 'Sign Up', href: '/signup' },
      !response.data.currentUser && { label: 'Sign In', href: '/signin' },
      response.data.currentUser && { label: 'Sign Out', href: '/signout' },
    ];
    setLinks(links);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const renderedLinks = Object.values(links)
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="mx-3 ">
          <Link to={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="bg-yellow-300 h-20 flex flex-row justify-between px-4 md:px-6 items-center">
      <Link className="text-center text-3xl font-bold mont-alternates " to="/">
        topiks
      </Link>

      <div className="flex justify-content-end">
        <ul className="flex align-center">{renderedLinks}</ul>
      </div>
    </nav>
  );
};
export default NavBar;
