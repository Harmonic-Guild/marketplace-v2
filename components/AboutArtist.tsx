import { FC, } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import config from '../config/config'
import logo from '../assets/harmonic-logo.png'


import styles from "../styles/AboutArtist.module.scss";
import Image from "next/image";

interface Props {
    storeId: string;
}

const images = config.images

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
                        <Image
                            src={config.logo3}
                            className="object-contain mx-auto rounded-lg"
                            layout="fill"
                            objectFit="contain"
                            alt={"header"}
                        />
                    </div>
                    <div className={styles["mini-cont"]}>
                        <div className={styles.avatar}>
                            <Image
                                src={config.profile}
                                layout="fill"
                                objectFit="contain"
                                alt={"avatar"}
                            />
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
                        <a href={config.infoLink}><button>Find out more &rarr;</button></a>
                    </div>
                    <p className={styles["artist-info"]}>
                        {config.description}
                    </p>
                </div>
            </div>

            <div className={styles["org-cont"]}>
                <div className={styles["outer-image-cont"]}>
                    <div className={styles["images-cont"]}>
                        {images.map((image, i: number) => (
                            <div key={i} className={styles["image-cont"]}>
                                <Image src={image} layout="fill" objectFit="contain" alt={`organiztion's nft number ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles["org-info"]}>
                    <div className={styles["org-name-logo"]}>
                        <div className={styles["inner-logo-cont"]}>
                            <Image src={logo} layout="fill" objectFit="contain" />
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
                        {/* <div className={styles["info-cont"]}>
                            <div className={styles["the-info"]}>
                                <div className={styles["property"]}>
                                    <p className={styles["property-name"]}>Items</p>
                                    <p className={styles["property-value"]}>5.6k</p>
                                </div>
                                <div className={styles["property"]}>
                                    <p className={styles["property-name"]}>Owners</p>
                                    <p className={styles["property-value"]}>3.7k</p>
                                </div>
                                <div className={styles["property"]}>
                                    <p className={styles["property-name"]}>Floor Price</p>
                                    <p className={styles["property-value"]}>
                                        <Near className={styles["near-logo"]} fill="white" />
                                        200.4k
                                    </p>
                                </div>
                                <div className={styles["property"]}>
                                    <p className={styles["property-name"]}>Volume Trade</p>
                                    <p className={styles["property-value"]}>
                                        <Near className={styles["near-logo"]} fill="white" />
                                        36,3k
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutArtist;
