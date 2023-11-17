module.exports = {
  reactStrictMode: true,
  webpack: (config, { _ }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};
