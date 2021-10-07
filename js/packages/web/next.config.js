const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');

const assetPrefix = process.env.ASSET_PREFIX || '';

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@primary-color': '#0a5edf', // primary color for all components
            '@link-color': '#ffffff', // link color
            // '@success-color': '#52c41a', // success state color
            // '@warning-color': '#faad14', // warning state color
            // '@error-color': '#f5222d', // error state color
            // '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
            '@text-color': 'rgba(255, 255, 255)', // major text color
            // '@text-color-': 'rgba(0, 0, 0, 0.45)', // secondary text color
            // '@disabled-': 'rgba(0, 0, 0, 0.25)', // disable state color
            // '@border-radius-base': '2px', // major border radius
            // '@border-color-base': '#d9d9d9', // major border color
            // '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08) 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            '@assetPrefix': assetPrefix || "''",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
];

module.exports = withPlugins(plugins, {
  assetPrefix,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_STORE_OWNER_ADDRESS:
      process.env.STORE_OWNER_ADDRESS ||
      process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS,
    NEXT_PUBLIC_STORE_ADDRESS: process.env.STORE_ADDRESS,
    NEXT_PUBLIC_BIG_STORE: process.env.REACT_APP_BIG_STORE,
    NEXT_PUBLIC_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
});
