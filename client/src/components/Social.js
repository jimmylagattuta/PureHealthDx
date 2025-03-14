import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSnapchat, faTiktok, faYoutube, faPinterest, faThreads, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Social.css';

function Social() {
  const iconRefs = useRef([]);
  const [isFacebookClicked, setIsFacebookClicked] = useState(false); 
  const facebookContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    if (!isFacebookClicked) {
      iconRefs.current.forEach((icon) => {
        if (icon) observer.observe(icon);
      });
    }
  
    return () => {
      iconRefs.current.forEach((icon) => {
        if (icon) observer.unobserve(icon);
      });
    };
  }, [isFacebookClicked]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFacebookClicked &&
        facebookContainerRef.current &&
        !facebookContainerRef.current.contains(event.target)
      ) {
        setIsFacebookClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFacebookClicked]);

  const handleFacebookClick = () => {
      setIsFacebookClicked(prevState => !prevState);
  };

  return (
    <div className="social-media">
      <hr className="underline" />

      <h2 className="social-media-title">Connect With Us</h2>
      <div className="social-icons" ref={facebookContainerRef}>
        <a
          className="social-icon facebook"
          ref={(el) => (iconRefs.current[0] = el)}
          onClick={handleFacebookClick}
          key="facebook-main"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>

        {isFacebookClicked && (
          <>
            <a
              href="https://www.facebook.com/BCBCarts/about"
              className="social-icon facebook"
              style={{ opacity: '1', fontSize: '1.5em', color: '#1877F2', alignSelf: 'center' }}
              key="facebook-long-beach"
            >
              <FontAwesomeIcon icon={faFacebook} /> Long Beach, CA
            </a>
            <a
              href="https://www.facebook.com/profile.php/?id=61550530888896"
              className="social-icon facebook"
              style={{ opacity: '1', fontSize: '1.5em', color: '#1877F2', alignSelf: 'center' }}
              key="facebook-griffin"
            >
              <FontAwesomeIcon icon={faFacebook} /> Griffin, GA
            </a>
          </>
        )}

        {!isFacebookClicked && (
          <>
            <a
              href="https://www.snapchat.com/add/mebcbatyawho?sender_web_id=e45b430a-0cac-45b4-a794-4261d854c91c&device_type=ios&is_copy_url=true"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon snapchat"
              ref={(el) => (iconRefs.current[1] = el)}
              key="snapchat"
            >
              <FontAwesomeIcon icon={faSnapchat} />
            </a>
            <a
              href="https://tiktok.com/@bcbcarts"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon tiktok"
              ref={(el) => (iconRefs.current[2] = el)}
              key="tiktok"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a
              href="https://m.youtube.com/@bcbcarts2640"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon youtube"
              ref={(el) => (iconRefs.current[3] = el)}
              key="youtube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.pinterest.com/bblackman0408/?invite_code=a5411783616e4987aa516c60050893e1&sender=801289096109711486"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon pinterest"
              ref={(el) => (iconRefs.current[4] = el)}
              key="pinterest"
            >
              <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a
              href="https://www.threads.net/@mebcbatyawho?invite=0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon threads"
              ref={(el) => (iconRefs.current[5] = el)}
              key="threads"
            >
              <FontAwesomeIcon icon={faThreads} />
            </a>
            <a
              href="https://www.instagram.com/mebcbatyawho/profilecard/?igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              ref={(el) => (iconRefs.current[6] = el)}
              key="instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </>
        )}
      </div>

      <hr className="underline" />
    </div>
  );
}

export default Social;
