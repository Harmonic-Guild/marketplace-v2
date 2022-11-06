import Link from "next/link";
import Image from "next/image";
import { BsArrowUp } from "react-icons/bs";
import logo from "../assets/harmonic-logo.png";
import { FiUsers } from "react-icons/fi";

const Footer = () => {
    const scrollToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return (
        <footer className="w-full max-w-screen-2xl mx-auto px-6 py-10 text-gray-700 mt-20">
            {/* <div className="flex justify-center items-center my-10">
                <button className="lg:flex lg:gap-10 text-center no-underline bg-yellow-500 px-10 py-3 font-bold rounded-md text-gray-900 text-lg">
                <div className="flex items-center justify-center gap-3">
                    <div>Community</div>
                    <div>
                    <FiUsers />
                    </div>
                </div>
                <div>Coming Soon</div>
                </button>
            </div> */}
            <div className="flex flex-wrap justify-between p-10 gap-8">
                <div className="mb-5">
                    <div>
                        <Link href="/" passHref>
                            <a className="py-6 relative w-40 h-20 inline-block">
                                <Image src={logo.src} layout="fill" objectFit="contain" alt="logo" className="cursor-pointer mb-5" />
                            </a>
                        </Link>
                        <div className="leading-loose">
                            <span>support@harmonicguild.io</span> <br />
                            {/* <span>+2343878472983</span> */}
                        </div>
                    </div>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold ">LEARN MORE</span>
                    <ul className="leading-loose capitalize">
                        <li>About</li>
                        <li>Merchant</li>
                        <li>Partners</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold ">LEGAL</span>
                    <ul className="leading-loose capitalize ">
                        <li>General Info</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold ">TALK TO US</span>
                    <ul className="leading-loose capitalize ">
                        <li>Contact us</li>
                        <li>Facebook</li>
                        <li>LinkedIn</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div onClick={() => scrollToTop()} className="p-4 btnColor rounded-full w-10 h-10 cursor-pointer">
                    <BsArrowUp className="w-6 h-6 -mt-2 -ml-2" />
                </div>
            </div>
            <div className="text-center">
                <span>&copy; {new Date().getFullYear()} HarmonicGuild. All right reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
