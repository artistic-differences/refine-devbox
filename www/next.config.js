module.exports = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    experimental: {
        newNextLinkBehavior: true,
    },
    transpilePackages: [
        "@refinedev/antd",
        "@refinedev/inferencer",
        "antd",
        "@ant-design/pro-components",
        "@ant-design/pro-layout",
        "@ant-design/pro-utils",
        "@ant-design/pro-provider",
        "rc-pagination",
        "rc-picker",
    ],
};
