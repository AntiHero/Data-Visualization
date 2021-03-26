module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '>0.25%',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime']
};
