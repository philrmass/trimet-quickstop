export default (config, env, helpers) => {
  const isDev = Boolean(process.env.DEV);
  config.output.publicPath = isDev ? '' : '/trimet-quickstop/';
  console.log(`Using ${isDev ? 'dev' : 'prod'} publicPath='${config.output.publicPath}'`);

  // use the public path in your app as 'process.env.PUBLIC_PATH'
  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(config.output.publicPath || '/'),
    }),
  );
};
