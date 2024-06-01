import {FaFacebookSquare,FaInstagramSquare, FaYoutubeSquare, FaSpotify} from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiApplemusic } from 'react-icons/si';
import { Link } from 'react-router-dom';

const styles = {
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '50px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  icon: {
    fontSize: '34px'
  }
};

const Links = () => {

  return (
    <>
      <span style={styles.links}>
        <Link to='/' style={styles.link}>
          <FaFacebookSquare style={styles.icon} />
        </Link>
        <Link to='/' style={styles.link}>
          <FaSquareXTwitter style={styles.icon} />
        </Link>
        <Link to='/' style={styles.link}>
          <FaInstagramSquare style={styles.icon} />
        </Link>
        <Link to='/' style={styles.link}>
          <FaYoutubeSquare style={styles.icon} />
        </Link>
        <Link to='/' style={styles.link}>
          <SiApplemusic style={styles.icon} />
        </Link>
        <Link to='/' style={styles.link}>
          <FaSpotify style={styles.icon} />
        </Link>
      </span>
    </>
  );
};

export default Links;