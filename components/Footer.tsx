import Link from "next/link";
import Image from "next/image";
import { BsArrowUp } from "react-icons/bs";
import logo from "../assets/harmonic-logo.png";
import { FiUsers } from "react-icons/fi";
import config from "../config/config";

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
                <div className="mb-5 lg:w-1/4">
                    <div>
                        <Link href={config.publicUrl} passHref>
                            <a className="py-6 relative w-24 lg:w-40 h-20 inline-block" target="_blank">
                                {config.logo1 && <Image src={config.logo1} layout="fill" objectFit="contain" alt="" className="cursor-pointer" />}
                            </a>
                        </Link>
                        <div className="leading-loose">
                            {config.email && (
                                <span className="block font-text mb-2">{config.email}</span>
                            )}
                            {config.phone && (
                                <span className="block font-text mb-2">{config.phone}</span>
                            )}
                            {config.address && (
                                <span className="block font-text">{config.address}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold font-header">LEARN MORE</span>
                    <ul className="leading-loose capitalize font-text">
                        <Link href={config.publicUrl}>
                            <a target="_blank">
                                <li>About</li>
                            </a>
                        </Link>
                    </ul>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold font-header">LEGAL</span>
                    <ul className="leading-loose capitalize font-text">
                        <li>General Info</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div className="lg:text-xl text-sm">
                    <span className="font-bold font-header">TALK TO US</span>
                    <ul className="leading-loose capitalize font-text">
                        {config.igLink && (
                            <li>
                                <Link href={config.igLink}>
                                    <a target="_blank">instagram</a>
                                </Link>
                            </li>
                        )}
                        {config.twitterLink && (
                            <li>
                                <Link href={config.twitterLink}>
                                    <a target="_blank">Twitter</a>
                                </Link>
                            </li>
                        )}
                        {config.facebookLink && (
                            <li>
                                <Link href={config.facebookLink}>
                                    <a target="_blank">Facebook</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div onClick={() => scrollToTop()} className="p-4 btnColor rounded-full w-10 h-10 cursor-pointer">
                    <BsArrowUp className="w-6 h-6 -mt-2 -ml-2" />
                </div>
            </div>
            <div className="text-center">
                <span>
                    &copy; {new Date().getFullYear()} {config.title}. All right reserved. <br /> Powered by Harmonic Guild
                </span>
            </div>
        </footer>
    );
};

export default Footer;
