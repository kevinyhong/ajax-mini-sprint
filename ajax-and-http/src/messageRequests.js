/* 
In the first part of this mini-sprint, you were dealing with a server that you had started up yourself - similar to
how you've been using live-server to gain access to and work with your code, but which served the purpose of providing
access to a store of data that we could manipulate. In the main sprint exercise, Chatterbox, we'll be working with a
different server that we can interact with via AJAX requests to fetch the messages stored on that server and write new
messages to be shared with all users of our Chatterbox application.

You can interact with the server with the following URL - https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/CAMPUS -
with the CAMPUS having the following structure: hr-XXX (where XXX is the 2- or 3-letter identifier for your campus - e.g., hr-sfo)

Along with the URL, there are two endpoints that we can interact with:

- GET - fetches all the messages on the server
- POST - writes a new message to the server with the following format:

  var message = {
    username: 'shawndrost',
    text: 'trololo',
    roomname: 'test'
  };

One additional condition to making valid requests to the server is the requirement of an authorization key with the use of a Github
Personal Access Token (PAT). Instructions for how to obtain a Github PAT can be found under the "Obtaining an API Key" section of the
"Exercise: Chatterbox" module in gLearn (link in the README). The API key provided by Github will need to be introduced as an Authorization 
request header (check the documentation at https://api.jquery.com/jquery.ajax/ for how to add a request header).

Both the CAMPUS and API_KEY variables found in the config.example.js file should be defined in a separate config.js file and used when 
making your requests.
*/

var fetchMessagesFromParseServer = function (/* FILL_ME_IN */ callback) {
  /* FILL_ME_IN */
  $.ajax({
    type: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${CAMPUS}`,
    headers: {
      "Authorization": API_KEY
    },
    success: (data) => {
      callback(data)
    },
    error: (error) => {
      console.log(error)
    }
  })
};

var addMessageToParseServer = function (/* FILL_ME_IN */ message, callback) {
  /* FILL_ME_IN */
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
    error: (error) => {
      console.log(error)
    }
  })
};