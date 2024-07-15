const interceptor = async (req, res, next) => {
  console.log(
    "NEW REQUEST\n", 
    req.method, " ", req.url, "\n",
    // "Headers: ", req.headers, "\n",
    "Body: ", req.body, "\n",
    "Params: ", req.params, "\n",
    "Query: ", req.query, "\n",
    "Cookies: ", req.cookies, "\n",
    // "Signed Cookies: ", req.signedCookies, "\n",
    // "Session: ", req.session, "\n",
    // "User: ", req.user, "\n",
    // "JWT: ", req.jwt, "\n",
    // "IP: ", req.ip, "\n",
    // "Hostname: ", req.hostname, "\n",
    // "Original URL: ", req.originalUrl, "\n",
    // "Protocol: ", req.protocol, "\n",
    // "Secure: ", req.secure, "\n",
    // "Stale: ", req.stale, "\n",
    // "Subdomains: ", req.subdomains, "\n",
    // "XHR: ", req.xhr, "\n",
    // "Accepted: ", req.accepts(), "\n",
    // "Accepted Charsets: ", req.acceptsCharsets(), "\n",
    // "Accepted Encodings: ", req.acceptsEncodings(), "\n",
    // "Accepted Languages: ", req.acceptsLanguages(), "\n",
    // "Is: ", req.is(), "\n",
    // "IPs: ", req.ips, "\n"
  );
  next();
};

module.exports = interceptor;
