import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaSpotify } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiApplemusic } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Links.css'

const Links = () => {
  return (
    <>
      <span className='links-container'>
        <Link to='/' className='link'>
          <FaFacebookSquare className='icon' />
        </Link>
        <Link to='/' className='link'>
          <FaSquareXTwitter className='icon' />
        </Link>
        <Link to='/' className='link'>
          <FaInstagramSquare className='icon' />
        </Link>
        <Link to='/' className='link'>
          <FaYoutubeSquare className='icon' />
        </Link>
        <Link to='/' className='link'>
          <SiApplemusic className='icon' />
        </Link>
        <Link to='/' className='link'>
          <FaSpotify className='icon' />
        </Link>
      </span>
    </>
  );
};

export default Links;