const getJson = (request, response, message, id) => {
  const messageJSON = {
    message,
    id,
  };

  const stringMessage = JSON.stringify(messageJSON);

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(stringMessage);
  console.log(stringMessage);
  response.end();
};

const getSuccess = (request, response) => {
  getJson(request, response, 'This is a successful response', 'success');
};

const getBadRequest = (request, response) => {
  getJson(request, response, 'Missing valid query parameter set to true', 'badRequest');
};

const getUnauthorized = (request, response) => {
  getJson(request, response, 'Missing loggedIn query parameter set to yes', 'Unauthorized');
};

const getForbidden = (request, response) => {
  getJson(request, response, 'You do not have access to this content', 'forbidden');
};

const getInternalError = (request, response) => {
  getJson(request, response, 'Internal Server Error. Something went wrong.', 'internalError');
};

const getNotImplimented = (request, response) => {
  getJson(
    request,
    response,
    'A get request for this page has not been implemented yet. Check again later for updated content.',
    'notImplimented',
  );
};

const getNotFound = (request, response) => {
  getJson(request, response, 'The page you are looking for was not found', 'notFound');
};

module.exports = {
  getSuccess, getBadRequest, getUnauthorized, getForbidden, getInternalError, getNotImplimented, getNotFound,
};
