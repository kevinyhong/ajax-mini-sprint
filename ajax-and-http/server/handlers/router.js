const headers = require('./cors');
const qs = require('querystring');
const dummyComplexity = require('./dummyData.js');
const {
  getAllMessages,
  getMessage,
  addMessage,
  updateMessage,
  deleteMessage,
  clearCache
} = require('./messageHandler.js');

module.exports.parser = (req, res, next = module.exports.routeHandler) => {
  if(req.url !== '/reset') {
    console.log(
      `Received a request of type ${req.method} to the endpoint "${req.url}".`
    );
  }
  let buffer = '';
  req.on('data', (chunk) => {
    buffer += chunk;
  });
  req.on('end', () => {
    if(buffer !== '') {
      req.body = qs.parse(buffer);
    }
    next(req, res);
  });
};

module.exports.routeHandler = (req, res) => {
  const type = req.method;
  const url = req.url;

  // GET request endpoints
  if (type === 'GET') {
    if (url === '/getAll') {
      getAllMessages((err, messages) => {
        if (err) {
          console.log(err);
          res.writeHead(400, headers);
          res.write(
            'An error occured. Check your server console for more details!'
          );
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(JSON.stringify(messages));
          res.end();
        }
      });
    } else if (url.includes('/getOne')) {
      const params = qs.decode(url, '?');
      getMessage(params.id, (err, message) => {
        if (err) {
          console.log(err);
          res.writeHead(400, headers);
          res.write(
            'An error occured. Check your server console for more details!'
          );
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(JSON.stringify({ data: message }));
          res.end();
        }
      });
    } else {
      res.writeHead(200, headers);
      res.write(`Invalid endpoint ${url} on received request of type ${type}.`);
      res.end();
    }
  }

  // POST request endpoints
  else if (type === 'POST') {
    if (url === '/send') {
      const message = req.body.message;
      addMessage(message, (err, id) => {
        if (err) {
          console.log(err);
          res.writeHead(400, headers);
          res.write(
            'An error occured.  Check your server console for more details!'
          );
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              thisIsNotTheDataYouWant: dummyComplexity,
              data: {
                hint: 'Hey, over here!',
                id,
              },
              notTheRightData: dummyComplexity
            })
          );
          res.end();
        }
      });
    } else {
      res.writeHead(200, headers);
      res.write(
        'POST request received at the base endpoint or an invalid endpoint.'
      );
      res.end();
    }
  }

  // PUT request endpoints
  else if (type === 'PUT') {
    if (url === '/change') {
      const { id, message } = req.body;
      updateMessage(id, message, (err, success) => {
        if (err) {
          console.log(err);
          res.writeHead(400, headers);
          res.write(
            'An error occured.  Check your server console for more details!'
          );
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              otherData: dummyComplexity,
              data: {
                success
              },
              notTheRightData: dummyComplexity
            })
          );
          res.end();
        }
      });
    } else {
      res.writeHead(200, headers);
      res.write(
        'PUT request received at the base endpoint or an invalid endpoint.'
      );
      res.end();
    }
  }

  // DELETE request endpoints
  else if (type === 'DELETE') {
    if (url === '/remove') {
      const id = req.body.id;
      deleteMessage(id, (err, success) => {
        if (err) {
          console.log(err);
          res.writeHead(400, headers);
          res.write(
            'An error occured.  Check your server console for more details!'
          );
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              notTheRightData: dummyComplexity,
              data: {
                success
              },
              otherData: dummyComplexity
            })
          );
          res.end();
        }
      });

    // Endpoint to reset the cache for testing
    } else if (url === '/reset') {
      clearCache((err, success) => {
        if (err) {
          res.writeHead(208, headers);
          res.write(JSON.stringify(err));
          res.end();
        } else {
          res.writeHead(205, headers);
          res.write(success);
          res.end();
        }
      });
    } else {
      res.writeHead(200, headers);
      res.write(
        'DELETE request received at the base endpoint or an invalid endpoint.'
      );
      res.end();
    }
  }

  // Necessary to appease the CORS gods
  else if (type === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  // Default to 405 Error for unsupported request methods.
  else {
    res.writeHead(405, headers);
    res.write('Sorry, that is an unsupported request type.');
    res.end();
  }
};
