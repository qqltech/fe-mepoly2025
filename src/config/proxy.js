// const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use(
//     "/api",
//     proxy({
//       target: "https://backend.qqltech.com:7021",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "/operation/dashboard/export_web"
//       }
//     })
//   );
// };