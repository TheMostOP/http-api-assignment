const getXml = (request, response, message, id) => {
  const messageXML = `<response><message>${message}</message><id>${id}</id></response>`;

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.write(messageXML);
  console.log(messageXML);
  response.end();
};

const getSuccess = (request, response) => {
  getXml(request, response, 'This is a successful response', 'success');
};

const getBadRequest = (request, response) => {
  getXml(request, response, 'Missing valid query parameter set to true', 'badRequest');
};

const getUnauthorized = (request, response) => {
  getXml(request, response, 'Missing loggedIn query parameter set to yes', 'Unauthorized');
};

const getForbidden = (request, response) => {
  getXml(request, response, 'You do not have access to this content', 'forbidden');
};

const getInternalError = (request, response) => {
  getXml(request, response, 'Internal Server Error. Something went wrong.', 'internalError');
};

const getNotImplimented = (request, response) => {
  getXml(
    request,
    response,
    'A get request for this page has not been implemented yet. Check again later for updated content.',
    'notImplimented',
  );
};

const getNotFound = (request, response) => {
  getXml(request, response, 'The page you are looking for was not found', 'notFound');
};

module.exports = {
  getSuccess, getBadRequest, getUnauthorized, getForbidden, getInternalError, getNotImplimented, getNotFound,
};
