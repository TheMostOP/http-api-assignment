const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// create the structure of the URL
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/style': htmlHandler.getStyle,
    '/success': jsonHandler.getSuccess,
    '/success&type=application/json': jsonHandler.getSuccess,
    '/success&type=text/xml': xmlHandler.getSuccess,
    '/badRequest': jsonHandler.getBadRequest,
    '/badRequest&type=application/json': jsonHandler.getBadRequest,
    '/badRequest&type=text/xml': xmlHandler.getBadRequest,
    '/unauthorized': jsonHandler.getUnauthorized,
    '/unauthorized&type=application/json': jsonHandler.getUnauthorized,
    '/unauthorized&type=text/xml': xmlHandler.getUnauthorized,
    '/forbidden': jsonHandler.getForbidden,
    '/forbidden&type=application/json': jsonHandler.getForbidden,
    '/forbidden&type=text/xml': xmlHandler.getForbidden,
    '/internal': jsonHandler.getInternalError,
    '/internal&type=application/json': jsonHandler.getInternalError,
    '/internal&type=text/xml': xmlHandler.getInternalError,
    '/notImplimented': jsonHandler.getNotImplimented,
    '/notImplimented&type=application/json': jsonHandler.getNotImplimented,
    '/notImplimented&type=text/xml': xmlHandler.getNotImplimented,
    notFound: jsonHandler.getNotFound,
  },
  HEAD: {
    notFound: jsonHandler.getNotFound,
  },
};

const onRequest = (request, response) => {
  console.log(request.url);

  // parse the information from the URL
  const parsedURL = url.parse(request.url);

  // As I understand, here is where I should check what the accept header is,
  // and then decide to give as json or xml based on that.
  // But I cannot figure out how to get the accept header from the client,
  // which is why I have the roundabout way of getting the information from the url
  // console.log(request.method);

  // make sure we can handle the request
  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  // check to see if we have something to handle the request
  if (urlStruct[request.method][parsedURL.pathname]) {
    return urlStruct[request.method][parsedURL.pathname](request, response);
  }

  return urlStruct[request.method].notFound(request, response);
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
