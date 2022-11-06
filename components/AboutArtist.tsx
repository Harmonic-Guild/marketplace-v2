import { FC, useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { Token } from "../constants/interfaces";
import logo from "../assets/harmonic-logo.png";
import Near from "../icons/near.svg";

import styles from "../styles/AboutArtist.module.scss";
import Image from "next/image";

interface Props {
    storeId: string;
}

const FETCH_WEEKLY = gql`
    query MyQuery($storeId: String!) {
        token(
            where: { storeId: { _eq: $storeId }, list: { price: { _is_null: false } }, burnedAt: { _is_null: true } }
            limit: 3
            offset: 3
            distinct_on: thingId
            order_by: { thingId: desc }
        ) {
            id
            lists(order_by: { createdAt: desc }, limit: 1) {
                price
                autotransfer
                offer {
                    price
                    timeout
                }
            }
            txId
            thingId
            thing {
                id
                metaId
                metadata {
                    title
                    media
                    media_type
                    animation_url
                    animation_type
                }
            }
        }
    }
`;

const images = [
    "https://pbs.twimg.com/media/FbpyI7oUcAAJtWy?format=jpg&name=small",
    "https://pbs.twimg.com/media/Fbpz9sVXkAA6l2h?format=jpg&name=small",
    "https://pbs.twimg.com/media/FbpAEs8VEAAlXCB?format=jpg&name=small",
];

const AboutArtist: FC<Props> = ({ storeId }) => {
    const [tokens, setTokens] = useState<Token[]>([]);

    const [getTokens, { loading: loadingtokensData, data: tokensData }] = useLazyQuery(FETCH_WEEKLY, {
        variables: {
            storeId: "",
        },
    });

    useEffect(() => {
        getTokens({
            variables: {
                storeId,
            },
        });
    }, []);

    useEffect(() => {
        // console.log(storeData);

        if (!tokensData) return;

        if (tokensData?.token.length === 0) return;

        const weeklyTokens = tokensData.token.map((token: any) => token);

        setTokens(weeklyTokens);
        console.log(weeklyTokens);

        // console.log(tokensData, "*/*//*/*//+896");
        // console.log(weeklyTokens[1].thing.metadata.media);
    }, [tokensData]);

    return (
        <div className={styles.container}>
            <div className="text-center">
                <p className="text-secondary mb-2">
                    <GiStarShuriken className="inline w-6 h-5" />
                </p>
                <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> About Artist </h2>
            </div>
            <div className={styles["social-box"]}>
                <div className={styles.header}>
                    <div className={styles["header-image-cont"]}>
                        <Image
                            src="https://pbs.twimg.com/media/FbnZWY1XwAAjUWk?format=jpg&name=small"
                            className="object-contain mx-auto rounded-lg"
                            layout="fill"
                            objectFit="cover"
                            alt={"header"}
                        />
                    </div>
                    <div className={styles["mini-cont"]}>
                        <div className={styles.avatar}>
                            <Image
                                src="https://pbs.twimg.com/media/Fbm9XtXXkAY-jxS?format=jpg&name=360x360"
                                layout="fill"
                                objectFit="cover"
                                alt={"avatar"}
                            />
                        </div>
                        <div className={styles["icons-cont"]}>
                            <AiFillInstagram />
                            <AiOutlineTwitter />
                        </div>
                    </div>
                </div>
                <div className={styles["more-info"]}>
                    <div className={styles.top}>
                        <p>
                            Artist name <MdVerified color="#1D9BF0" />
                        </p>
                        <button>Find out more &rarr;</button>
                    </div>
                    <p className={styles["artist-info"]}>
                        About artist, Information about the artist who owns the marketplace. You can have any relevent information about your project provided here.
                    </p>
                </div>
            </div>

            <div className={styles["org-cont"]}>
                <div className={styles["outer-image-cont"]}>
                    <div className={styles["images-cont"]}>
                        {images.map((image, i: number) => (
                            <div key={i} className={styles["image-cont"]}>
                                <Image src={image} layout="fill" objectFit="cover" alt={`organiztion's nft number ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles["org-info"]}>
                    <div className={styles["org-name-logo"]}>
                        <div className={styles["inner-logo-cont"]}>
                            <Image src={logo.src} layout="fill" objectFit="contain" />
                        </div>
                    </div>
                    <div className={styles["more-info"]}>
                        <div className="mt-2">
                        <div className={styles["text-cont"]}>
                            {/* <p className={styles.name}>Harmonic Guild</p> */}
                            <p className={styles["artist-info"]}>
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
