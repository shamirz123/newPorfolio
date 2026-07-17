import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import "../styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>

        <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;