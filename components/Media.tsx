import Image from "next/image";
import React, { useState } from "react";
import { CgArrowsExpandRight } from "react-icons/cg";

type Props = {
    animation: string;
    poster: string;
    enlarge: any;
};

const Media: React.FC<Props> = ({animation, poster, enlarge}:Props) => {
    const [media, setMedia] = useState<string>("image");

    if (media !== "image")
        return (
            <div className="w-full mx-auto flex align-middle">
                <video controls className="" poster={poster} controlsList="nodownload" muted>
                    <source src={animation}></source>
                </video>
                <br />
            </div>
        );
    return (
        <>
            <Image
                objectFit="cover"
                className="w-4/5 lg:w-2/5 rounded-lg shadow-xl"
                width={600}
                height={600}
                src={animation}
                alt="image"
                onError={() => setMedia("video")}
            />
            <div className="flex gap-5 justify-end py-4">
                <div className="bg-primary-color p-2 rounded-full cursor-pointer" onClick={() => enlarge(true)}>
                    <CgArrowsExpandRight color="white" />
                </div>
            </div>
        </>
    );
};

export default Media;
