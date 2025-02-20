import { FaEnvelope, FaGithub } from "react-icons/fa";
import "../Styles/Footer.css"; // Import the CSS file

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="contact-links">
                    <a href="mailto:gowribaggiyam@gmail.com" className="contact-item">
                        <FaEnvelope className="icon" />
                        <span>gowribaggiyam@gmail.com</span>
                    </a>
                    <a href="mailto:boedec.g@gmail.com" className="contact-item">
                        <FaEnvelope className="icon" />
                        <span>boedec.g@gmail.com</span>
                    </a>
                </div>

                <a href="https://github.com/orgs/GB-Squad/repositories" target="_blank" rel="noopener noreferrer" className="github-link">
                    <FaGithub className="icon" />
                    <span>GitHub Repository</span>
                </a>

                <p className="footer-text"> Feel free to update the Data</p>
            </div>
        </footer>
    );
}
