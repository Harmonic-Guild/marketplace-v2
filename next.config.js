/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "arweave.net",
            "coldcdn.com",
            "firebasestorage.googleapis.com",
            "pbs.twimg.com",
            "lh3.googleusercontent.com",
            "twitter.com",
            "source.unsplash.com",
            "abs.twimg.com",
            "images.unsplash.com",
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
