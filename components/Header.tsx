import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWallet } from "@mintbase-js/react";
import { FiMenu, FiX } from "react-icons/fi";
// import NavBreadCrumb from './NavBreadCrumb'
import Near from "../icons/near.svg";
import config from "../config/config";

import styles from "../styles/Header.module.scss";

const Header = () => {
    const router = useRouter();

    const [toggleMenu, setToggleMenu] = useState<boolean>(true);
    // const [darkMode, setDarkMode] = useState<boolean>(true);
    const [currentPath, setCurrentPath] = useState<string>();
    const { isConnected, connect, disconnect, activeAccountId } = useWallet();

    const primaryColor = process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#233247";
    const secondaryColor = process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#5174a6";

    const buttonStyles = {
        backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        borderRadius: "100%",
        color: "white",
    };

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const walletAction = isConnected ? disconnect : connect;

    return (
        <header className={styles.header} id="nav">
            <div className={styles["inner-nav-cont"]}>
                <Link href="/" passHref>
                    <a className="py-6 relative w-24 lg:w-40 h-20 inline-block">
                        {config.logo1 && <Image src={config.logo1} layout="fill" objectFit="contain" alt="" className="cursor-pointer" />}
                    </a>
                </Link>

                {/* <Image src={config.logo1} layout="fill" objectFit="contain" alt="" className="cursor-pointer" /> */}

                <div className={styles["mobile-nav-cont"]}>
                    {toggleMenu ? (
                        <div className={styles["mobile-nav"]}>
                            <button className={styles["menu-btn"]}>
                                <FiMenu className="w-6 h-6 text-white" onClick={() => setToggleMenu(false)} />
                            </button>
                        </div>
                    ) : (
                        <div className="w-1/2 h-full">
                            <FiX className="w-6 h-6 relative text-black z-20" onClick={() => setToggleMenu(true)} />
                            <div className={styles["nav-content"]}>
                                <div className={styles["connection-cont"]}>
                                    
                                    <button onClick={walletAction} className="text-white">
                            {isConnected ? "Disconnect" : "Connect"}
                        </button>

                                </div>
                                    <Link  href={'/'} passHref>
                                        <div
                                            className={`font-header ${styles["nav-link"]} ${
                                                currentPath === '/' ? "border-font-color" : "border-white"
                                            }`}
                                        >
                                            Home
                                        </div>
                                    </Link>

                                    <Link  href={'/explore'} passHref>
                                        <div
                                            className={`font-header ${styles["nav-link"]} ${
                                                currentPath === '/explore' ? "border-font-color" : "border-white"
                                            }`}
                                        >
                                            Explore
                                        </div>
                                    </Link>

                                    {isConnected && <Link  href={`/myOwn?account=${activeAccountId}`} passHref>
                                        <div
                                            className={`font-header ${styles["nav-link"]} ${
                                                currentPath === `/myOwn?account=${activeAccountId}` ? "border-font-color" : "border-white"
                                            }`}
                                        >
                                            My NFTs
                                        </div>
                                    </Link>}

                                <div className={styles["nav-bottom"]}>
                                    <div className={styles["inner-cont"]}>
                                        <span>{activeAccountId}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hidden lg:flex w-full lg:w-3/5 mb-6 lg:mb-0 text-center space-x-5 lg:text-right">
                    <div className={styles["nav-cont"]}>
                            <Link href={'/'} passHref>
                                <p className={`font-header ${styles["nav-item"]} ${currentPath === '/' ? "border-font-color" : "border-white"}`}>
                                    Home
                                </p>
                            </Link>
                            <Link href={'/explore'} passHref>
                                <p className={`font-header ${styles["nav-item"]} ${currentPath === '/explore' ? "border-font-color" : "border-white"}`}>
                                    Explore
                                </p>
                            </Link>
                            {isConnected &&<Link href={`/myOwn?account=${activeAccountId}`} passHref>
                                <p className={`font-header ${styles["nav-item"]} ${currentPath === `/myOwn?account=${activeAccountId}` ? "border-font-color" : "border-white"}`}>
                                    My NFTs
                                </p>
                            </Link>}
                    </div>
                    <div style={buttonStyles} className={`font-header ${styles["button-cont"]}`}>
                        <button onClick={walletAction}>
                            {isConnected ? "Disconnect" : "Connect"}
                            <span className="ml-2 mt-1">
                                <Near className="w-4 h-4" fill={process.env.NEXT_PUBLIC_FONT_COLOR} />
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