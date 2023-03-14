import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useWallet } from "@mintbase-js/react";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
// import NavBreadCrumb from './NavBreadCrumb'
import Near from "../icons/near.svg";
import config from '../config/config'

import styles from "../styles/Header.module.scss";

const navTitles = [
    { title: "Home", href: "/" },
    { title: "Explore", href: "/explore" },
    { title: "My NFTs", href: "/myOwn" },
    //{ title: "Profile", href: "#" },
];

const Header = () => {
    const router = useRouter();

    const [toggleMenu, setToggleMenu] = useState<boolean>(true);
    // const [darkMode, setDarkMode] = useState<boolean>(true);
    const [toggleIcons, setToggleIcons] = useState<boolean>();
    const [currentPath, setCurrentPath] = useState<string>();
    const {
        isConnected, connect, disconnect, activeAccountId,
      } = useWallet();

    const primaryColor = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#233247';
    const secondaryColor = process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#5174a6';

    const buttonStyles = {
        backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        borderRadius: '100%',
        color: 'white'
    }

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const walletAction  = isConnected ? disconnect : connect;

    return (
        <header className={styles.header} id="nav">
            <div className={styles['inner-nav-cont']}>
                <Link href="/" passHref>
                    <a className="py-6 relative w-24 lg:w-40 h-20 inline-block">
                        {
                            config.logo1 && (
                                <Image src={config.logo1} layout="fill" objectFit="contain" alt="" className="cursor-pointer" />
                            )
                        }
                    </a>
                </Link>

                {/* <Image src={config.logo1} layout="fill" objectFit="contain" alt="" className="cursor-pointer" /> */}

                <div className={styles["mobile-nav-cont"]}>
                    {toggleMenu ? (
                        <div className={styles["mobile-nav"]}>
                            <button className={styles["connect-btn"]} onClick={walletAction}>
                                {isConnected ? "Disconnect" : "Connect"}
                                <span className="ml-2 mt-1">
                                    <Near className="w-4 h-4" fill="white" />
                                </span>
                            </button>
                            <button className={styles["menu-btn"]}>
                                <FiMenu className="w-6 h-6 text-white" onClick={() => setToggleMenu(false)} />
                            </button>
                        </div>
                    ) : (
                        <div className="w-1/2 h-full">
                            <FiX className="w-6 h-6 relative text-black z-20" onClick={() => setToggleMenu(true)} />
                            <div className={styles["nav-content"]}>
                                <div className={styles["connection-cont"]}>
                                    {isConnected ? (
                                        <div className={styles["info-cont"]}>
                                            <div className={styles.avatar}>
                                                <Image
                                                    src="https://images.unsplash.com/photo-1654792393225-3e8a53d124d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fG5mdCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className={styles["info-text"]}>
                                                <p className={styles["big-text"]}>Email</p>
                                                <p className={styles.address}>Address: {activeAccountId}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Not connected</p>
                                    )}
                                </div>
                                {navTitles.map((item, index) => (
                                    <Link key={index} href={item.href} passHref>
                                        <div className={`font-header ${styles["nav-link"]} ${currentPath == item.href ? "border-black" : "border-white"}`}>
                                            {item.title}
                                        </div>
                                    </Link>
                                ))}
                                <div className={styles["nav-bottom"]}>
                                    <div className={styles["inner-cont"]}>
                                        <div className={styles["toggle-light-dark"]} onClick={() => setToggleIcons(!toggleIcons)}>
                                            <div className={`${styles.ball} ${toggleIcons ? styles.active : ""}`}></div>
                                        </div>
                                        <div className={"border-r border-solid border-gray-300 h-8"}></div>
                                        <div className={styles["update-cont"]}>
                                            <span>Updates</span>
                                            <BsLayoutTextSidebarReverse className="w-5 h-5  px-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hidden lg:flex w-full lg:w-3/5 mb-6 lg:mb-0 text-center space-x-5 lg:text-right">
                    <div className={styles["nav-cont"]}>
                        {navTitles.map((item, index) => (
                            <Link key={index} href={item.href} passHref>
                                <a className={`font-header ${styles["nav-item"]} ${currentPath == item.href ? "border-black" : "border-white"}`}>{item.title}</a>
                            </Link>
                        ))}
                    </div>
                    <div style={buttonStyles} className={`font-header ${styles["button-cont"]}`}>
                        {/* <div onClick={() => setToggleIcons(!toggleIcons)}></div> */}
                        <button onClick={walletAction}>
                            {isConnected ? "Disconnect" : "Connect"}
                            <span className="ml-2 mt-1">
                                <Near className="w-4 h-4" fill="white" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* <NavBreadCrumb/> */}
        </header>
    );
};

export default Header;
