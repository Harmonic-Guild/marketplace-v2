import { FC, useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { Token } from "../constants/interfaces";

import styles from "../styles/AboutArtist.module.scss";
import Image from "next/image";

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

interface Props {
    storeId: string;
}

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

        console.log(tokensData, "*/*//*/*//+896");
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
                            {/* {tokens[1].thing.metadata.media && (
                                <Image
                                    src={tokens[1].thing.metadata.media}
                                    className="object-contain mx-auto rounded-lg"
                                    height={500}
                                    width={500}
                                    objectFit="cover"
                                    alt={"alt"}
                                />
                            )} */}
                            <div className={styles["mini-cont"]}>
                                <div className={styles["icons-cont"]}>
                                    <AiFillInstagram />
                                    <AiOutlineTwitter />
                                </div>
                            </div>
                        </div>
                        <div className={styles["more-info"]}>
                            <div className={"flex justify-between items-center"}>
                                <p>
                                    Artist Name <MdVerified color="blue" />
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AboutArtist;
