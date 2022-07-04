module.exports = {
  devServer: {
    //   // host: " http://localhost:8080/", //frontend host name
    //   // allowedHosts: "all",
    //   // port: 8080, //frontend port
    //   https: false, //no ssl
    //   proxy: {
    //     "/auth": {
    //       target: "http://localhost:8082",
    //     },
    //   },
    //   headers: {
    //     // typical header setting
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //     "Access-Control-Allow-Headers":  "X-Request-With, content-type, Authorization",
    //   },
    // },
    proxy: 'http://localhost:8082'
  }
};
