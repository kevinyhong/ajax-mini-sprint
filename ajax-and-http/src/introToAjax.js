// For the purposes of this exercise, use the function below for your error handling callback in all Ajax calls.
const errorLogger = (err) => {
  console.log("Oops! There was an error.");
  console.error(err);
};

/* ========== getAllItems ========== //
 *  The function and callback below are here as a basic example of an Ajax call and success callback.
 *
 * As you may have guessed from the function name, this AJAX request should fire a GET request to the server.
 * When invoked properly, this request should query the server for all the data which this given endpoint ('http://127.0.0.1:3000/foods')
 * is set to return.
 *
 * The data should then be returned and asynchronously parsed into the desired (JSON) format.
 *
 * Fill in the missing pieces!
 */
const getAllItems = (collection) => {
  $.ajax({
    type: 'GET',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    success: getAllItemsCallback,
    error: errorLogger,
  });
};

const getAllItemsCallback = (data) => {
  console.log(JSON.parse(data));
};

/* ========== getOneItem ========== /
 * Fix the call below!
 *
 * HINT: There is specific behavior for how Ajax sends GET requests with parameters. How might this relate
 * to the differences between the desired return of "getOneItem" and "getAllItems?"
 * 
 * CHALLENGE: Are there any other ways we could provide the parameters for our GET request? 
 * (HINT: this may require you to dig into the documentation for json-server, jQuery.ajax(), and the README)
 */
const getOneItem = (collection, id) => {
  $.ajax({
    type: 'GET',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: { id },
    success: getOneItemCallback,
    error: errorLogger
  });
};

const getOneItemCallback = (data) => {
  /* Model this function like the getAllItemsCallback, taking the differences between the requests into account */
  console.log(JSON.parse(data));
}

/* Write the rest of the functions below in the style of those above. Do not copy and paste from the above functions!
 *
 * You may need to read through some of the server and / or test code to figure out what endpoints your different requests types need to be sent to!
 *
 * Each of the following examples may seem similar but keep in mind that different request types manipulate data differently.
 * In the following examples, keep in mind the differences in each of the request types and how they are handled.  Also, even calls that focus on
 * outgoing data often have returns from the server containing useful information--be sure to handle that in your callbacks.
 *
 * PLEASE CHECK THE README FOR MORE INFORMATION ON HTTP METHODS
 *
 * HINT: The most common data format for modern APIs is json (and there are a few commonly used methods with the same name).
 */

/* ========== addItem ========== */

/*
HINT: What type of HTTP request should you be using to add an item to our Foods collection?
ANOTHER HINT: What is the shape of the data that you're adding to the collection?
*/

const addItem = (collection, item) => {
  /* FILL_ME_IN */
  $.ajax({
    type: 'POST',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: item,
    success: addItemCallback,
    error: errorLogger 
  })
};

const addItemCallback = (response) => {
  /* FILL_ME_IN */
  console.log(JSON.parse(response));
};

/* HINT: It looks like you're trying to update an existing item in our Foods collection - what type of request could be used to achieve this? */

/* ========== updateItem ========== */
const updateItem = (collection, id, item) => {
  /* FILL_ME_IN */
  $.ajax({
    type: 'PUT',
    url: `http://127.0.0.1:3000/${collection}/${id}`,
    contentType: "application/json",
    data: item,
    success: updateItemCallback,
    error: errorLogger 
  })
};

/* updateItemCallback() should extract the message from the server's response object */
const updateItemCallback = (response) => {
  /* FILL_ME_IN */
  console.log(JSON.parse(response).data.success);
};

/* ========== deleteItem ========== */
const deleteItem = (collection, id) => {
  /* FILL_ME_IN */
  $.ajax({
    type: 'DELETE',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: { id },
    success: deleteItemCallback,
    error: errorLogger 
  })
};

const deleteItemCallback = (response) => {
  /* FILL_ME_IN */
  console.log(JSON.parse(response).data.success);
};

/*
If you take a look at our sampleData.json file, you'll see that there's another collection that we can interact with. Similar to the
Foods collection, we also have a Vehicles collection available to us. After studying what exists in the Vehicle collection, your task
(if you choose to accept it) is to write functions that provide us with additional features:

- Write a function for each collection that would validate any inputs into the collection and incorporate them into the appropriate
  functions.
- 
(e.g., "Power Steering"; see the Vehicles in sampleData.json for examples)
*/

// COMMENT: There's an opportunity to talk about the difference in use cases for PUT and PATCH requests here (or at least to reference material in the README)
// INSTRUCTIONAL CHANGE/ADDITION: Could spend more time having students refactor provided Node HTTP server to use Express instead as an additional exercise