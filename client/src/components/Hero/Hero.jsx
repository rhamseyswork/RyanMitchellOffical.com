import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Hero.module.css';
import Loader from '../Loader/Loader.jsx'
import Message from '../Message/Message.jsx'
import NavLink from '../Button Link/ButtonLink'
import Meta from '../Meta/Meta.jsx'
import Button from 'react-bootstrap/Button'
import { useGetLinksQuery } from '../../slices/linksApiSlice.js'
import { FaPlay } from 'react-icons/fa'; 

const Hero = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const showAllLinks = windowWidth > 1045 || windowWidth < 768;

  const { keyword } = useParams();

  const { data, isLoading, error } = useGetLinksQuery({ keyword });

  if (isLoading) return <Loader />
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || 'Unknown error occurred'}
      </Message>
    )

  return (
    <>
      <Meta title="Ryan Mitch Link Tree" />
      {!keyword ? (
        ''
      ) : (
        <Button as={Link} to="/" className="btn btn-dark mb-4">
          Go Back
        </Button>
      )}

      <div className={styles.container} style={{}}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src="/Hero.webp"
            alt="Hero Image"
            width="100%"
            height="100%"
            style={{objectFit: "cover"}}
          />
                <button className={`${styles.playButton} ${isPlaying ? styles.isPlaying : ''}`} onClick={handlePlay}>
        <FaPlay className={styles.playIcon} />
      </button>
      <audio ref={audioRef} src="/jiglr-hello-world.mp3" />
        </div>
        <div>
          <h2>Ryan Mitchell - I AM DEATH. DESTROYER OF WORLDS</h2>
          <p>Choose your preferred music service</p>
          <div
            className={styles.containerBtn}
            style={{
              overflowY: showAllLinks? 'visible' : 'auto',
              maxHeight: showAllLinks ? 'none' : '127px',
            }}
          >
            {data.links.map((link) => (
              <NavLink
                key={link._id}
                img={link.img}
                to={link.url}
                alt={link.title}
                color={link.color}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          {!showAllLinks && data.links.length > 4 && (
            <div
              style={{
                fontSize: '12px',
                color: 'gray',
                padding: '0',
                margin: '0',
              }}
              className={styles.moreImages}
            >
              + {data.links.length - 5} more links
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Hero;
