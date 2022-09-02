import { FC, useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { Token } from "../constants/interfaces";

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
                    Lorem <GiStarShuriken className="inline w-6 h-5" />
                </p>
                <h2 className="text-mp-dark-2 text-4xl font-semibold mb-2"> About Artist </h2>
            </div>
            {tokens && (
                <>
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
                                    Artist Name <MdVerified color="blue" />
                                </p>
                                <button>Find out more &rarr;</button>
                            </div>
                            <p className={styles["artist-info"]}>
                                About artist, Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur perferendis unde architecto totam esse
                                reiciendis! Laboriosam enim eos aperiam dolor ducimus recusandae dignissimos nam, rerum animi, ullam consequuntur sint
                                quo.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AboutArtist;
