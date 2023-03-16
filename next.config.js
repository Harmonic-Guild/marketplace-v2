/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.arweave.net",
            },
        ],
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
            // "harmonicguild-my.sharepoint.com",
            "ik.imagekit.io",
            "p7rdszi5bvgkupb4feipmcni36rul4l2k2h6qtrvimymwtobg3ba.arweave.net",
            "randomuser.me",
            // "centralindia1-mediap.svc.ms",
            "q2iuajmnbtnet5j53fjfip45sd7mdboxkdd6rqjllxhd563lfgeq.arweave.net",
            "harmonicguild-my.sharepoint.com",
            "centralindia1-mediap.svc.ms",
            "q2iuajmnbtnet5j53fjfip45sd7mdboxkdd6rqjllxhd563lfgeq.arweave.net",
            "res.cloudinary.com",
            "www.deeptropics.org",
            'www.harmonicguild.io'
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
