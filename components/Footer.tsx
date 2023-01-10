import config from '../config/config.json'
import C1Footer from "./C1Footer";
import HarmonicFooter from "./HarmonicFooter";


const Footer = () => {
    return (
        <footer>
            <C1Footer/> 
            <hr />
            <HarmonicFooter/>      
            <div className="text-center">
                <span>&copy; {new Date().getFullYear()} {config.title}. All right reserved. <br /> Powered by Harmonic Guild</span>
            </div>
        </footer>
    );
};

export default Footer;
