import { FC, } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import config from '../config/config.json'
import bellLogo from '../assets/just-logo.jpg'


import styles from "../styles/AboutArtist.module.scss";
import Image from "next/image";

interface Props {
    storeId: string;
}

const images = config.images
const c1Site = config.c1Site
const harmonicSite = config.harmonicSite

const AboutArtist: FC<Props> = () => {
   

    return (
        <div className={styles.container}>
            <div className="text-center">
                <p className="text-secondary-color mb-2">
                    <GiStarShuriken className="inline w-6 h-5" />
                </p>
                <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> About Artist </h2>
            </div>
            <div className={styles["social-box"]}>
                <div className={styles.header}>
                    <div className={styles["header-image-cont"]}>
                        <a href={c1Site} target="_blank">
                            <Image
                                src={config.logo3}
                                className="object-contain mx-auto rounded-lg"
                                layout="fill"
                                objectFit="contain"
                                alt={"header"}
                            />
                        </a>
                    </div>
                    <div className={styles["mini-cont"]}>
                        <div className={styles.avatar}>
                            <a href={c1Site} target="_blank">
                                <Image
                                    src={config.profile}
                                    layout="fill"
                                    objectFit="contain"
                                    alt={"avatar"}
                                />
                            </a>
                        </div>
                        <div className={styles["icons-cont"]}>
                            <a href={config.igLink}><AiFillInstagram /></a>
                            <a href={config.twitterLink}><AiOutlineTwitter /></a>
                        </div>
                    </div>
                </div>
                <div className={styles["more-info"]}>
                    <div className={styles.top}>
                        <p>
                            {config.title} <MdVerified color="#1D9BF0" />
                        </p>
                        <a href={config.infoLink} target="_blank"><button>Find out more &rarr;</button></a>
                    </div>
                    <p className={styles["artist-info"]}>
                        {config.description}
                    </p>
                </div>
            </div>

            <div className={styles["org-cont"]}>
                <div className={styles["outer-image-cont"]}>
                    <div className={styles["images-cont"]}>
                        <div className={styles["image-cont"]}>
                            <a href={harmonicSite} target="_blank">
                                <Image src={bellLogo} layout="fill" objectFit="contain" alt={`Harmonic Guild`} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles["org-info"]}>
                    <div className={styles["org-name-logo"]}>
                        <div className="w-full">
                            {/* <Image src={logo} layout="fill" objectFit="contain" /> */}
                            <h1 className="md:text-2xl text-md mt-12 md:mt-4 text-center font-extrabold">Harmonic Guild</h1>
                        </div>
                    </div>
                    <div className={styles["more-info"]}>
                        <div className="mt-2">
                        <div className={styles["text-cont"]}>

                            <p className={styles["mini-text"]}>
                            We are an NFT Development Collective. We build smoother onboarding experiences and engagement products for your community using the power of NFTs. Contact us to get a custom marketplace deployed for your project.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutArtist;
