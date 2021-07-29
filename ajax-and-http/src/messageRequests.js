/* 
NOTE: This part of the exercise is intended to give you some insight into how Chatterbox Client will interact with an
external data store (a Parse server, in this instance) where messages for the application can be retrieved and stored. 
The functionality that you will beimplementing here will be similar to the functionality that is provided for you in 
the main sprint, so take the time to build an understanding of the interactions!

In the first part of this mini-sprint, you were dealing with a json-server that you had started up yourself - similar to
how you've been using live-server to gain access to and work with your code, but which served the purpose of providing
access to a store of data that we could manipulate (our sampleData.json file). In the main sprint exercise, Chatterbox Client,
we'll be working with a different server that we can interact with via AJAX requests to fetch the messages stored on that 
server and write new messages to be shared with all users of our Chatterbox application.

You can interact with the server with the following URL - https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/CAMPUS -
with the CAMPUS having the following structure: hr-XXX (where XXX is the 2- or 3-letter campus identifier - e.g., hr-sfo, hr-atx)

Along with the URL, there are two types of requests that we can make:

- GET - fetches all the messages on the server
- POST - writes a new message to the server with the following format:

  var message = {
    username: 'shawndrost',
    text: 'trololo',
    roomname: 'test'
  };

One additional condition to making valid requests to the server is the requirement of an authorization key with the use of a Github
Personal Access Token (PAT). Instructions for how to obtain a Github PAT can be found under the "Obtaining an API Key" section of the
"Exercise: Chatterbox" module in gLearn (link at the bottom of this README). The API key provided by Github will need to be introduced 
as an Authorization request header (check the documentation at https://api.jquery.com/jquery.ajax/ for how to add a request header).

Both the CAMPUS and API_KEY variables found in the config.example.js file should be defined in a separate config.js file and used when 
making your requests. Failure to provide the correct variables will result in your AJAX request either not being properly authenticated and/or
not being routed to the correct location.


*/

// HINT: You can reuse the errorLogger callback here if you'd like to or create a custom error logger

var fetchMessagesFromParseServer = function (/* FILL_ME_IN */ callback) {
  /* START SOLUTION */
  $.ajax({
    type: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${CAMPUS}`,
    headers: {
      "Authorization": API_KEY
    },
    success: (data) => {
      callback(data)
    },
    error: errorLogger
  });
  /* ELSE
    // TODO: Make an AJAX request to fetch messages from the Message server
    $.ajax({
      headers: {
        // You'll need to make use of a particular header to make a valid request
      }
    })
    END SOLUTION */
};

var addMessageToParseServer = function (/* FILL_ME_IN */ message, callback) {
  /* START SOLUTION */
  $.ajax({
    type: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${CAMPUS}`,
    data: message,
    headers: {
      "Authorization": API_KEY
    },
    success: (data) => {
      callback(data)
    },
    error: errorLogger
  });
  /* ELSE
    // TODO: Make an AJAX request to send a message to the Message server
    END SOLUTION */
};