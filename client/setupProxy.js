const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify the path you want to proxy
    createProxyMiddleware({
      target:
        "http://xclone-server-env.eba-iwkdia2n.us-east-1.elasticbeanstalk.com/",
      changeOrigin: true,
      secure: false, // Set this to false if your backend server doesn't have a valid SSL certificate
    })
  );
};
