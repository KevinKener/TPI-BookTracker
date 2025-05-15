import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles['footer-container']}>
        <div className={styles['footer-links']}>
          <nav aria-label='Enlaces del pie de página'>
            <ul>
              <li><a href='#'>Privacidad</a></li>
              <li><a href='#'>Equipo</a></li>
              <li><a href='#'>Ayuda</a></li>
              <li><a href='#'>Términos y Condiciones</a></li>
            </ul>
          </nav>
        </div>

        <div className={styles['footer-social']}>
          <ul>
            <li><a href='#' aria-label='Enlace a Facebook'><FontAwesomeIcon icon={faFacebook} /></a></li>
            <li><a href='#' aria-label='Enlace a X (Twitter)'><FontAwesomeIcon icon={faXTwitter} /></a></li>
            <li><a href='#' aria-label='Enlace a Instagram'><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li><a href='#' aria-label='Enlace a Reddit'><FontAwesomeIcon icon={faRedditAlien} /></a></li>
          </ul>
        </div>

        <div className={styles['footer-copyright']}>
          <p>© 2025 BookTracker</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;