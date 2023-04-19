import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import config from '../config/config'
import { useState } from "react";


const Footer = () => {
    const [footerTitles, setFooterTitles] = useState([
        {name: "Support", href: ''},
        {name: "Terms", href: ''},
        {name: "Privacy", href: ''},
        {name: "Cookie choices", href: '#'}
    ])

    return (
        <footer className="text-center uppercase md:text-xs text-xss font-medium w-full mx-auto mt-20">
            <div className="justify-between p-5 lg:p-10">
                <div className="flex w-fit mx-auto gap-6">
                    <a href={process.env.NEXT_PUBLIC_FACEBOOK_LINK} target="_blank"><BsFacebook className="w-6 h-6 hover:text-yellow-600"/></a>
                    <a href={process.env.NEXT_PUBLIC_TWITTER_LINK} target="_blank"><BsTwitter className="w-6 h-6 hover:text-yellow-600"/></a>
                    <a href={process.env.NEXT_PUBLIC_IG_LINK} target="_blank"><BsInstagram className="w-6 h-6 hover:text-yellow-600"/></a>
                </div>
                <div className=" pt-6 pb-3">
                    <span>&copy; {new Date().getFullYear()} {config.title}. All rights reserved.</span>
                </div>
                <div className="flex flex-wrap justify-center md:break-after-column">
                    {
                        footerTitles.map((footerTitle, index) => (
                            <a key={index} href={footerTitle.href} className={`px-2 lg:px-3 ${index !== footerTitles.length - 1 && 'border-black border-r'}`}>
                                <p className="mt-1 py-0">{footerTitle.name}</p>
                            </a>
                        ))
                    }
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;
