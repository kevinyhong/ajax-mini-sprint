// For the purposes of this exercise, use the function below for your error handling callback in all Ajax calls.
const FILL_ME_IN = '';
const REPLACE_ME = () => {};

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
var getAllItems = (collection) => {
  /* START SOLUTION */
  $.ajax({
    type: 'GET',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    success: getAllItemsCallback,
    error: errorLogger,
  });
  /* ELSE
    $.ajax({
      type: FILL_ME_IN,
      url: FILL_ME_IN,
      contentType: "application/json",
      success: REPLACE_ME,
      error: REPLACE_ME,
    });
  
    END SOLUTION */
};

var getAllItemsCallback = (data) => {
  /* START SOLUTION */
  console.log(JSON.parse(data));
  /* ELSE
    // TODO: Log the data for the item that comes back
    END SOLUTION */
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
var getOneItem = (collection, id) => {
  /* START SOLUTION */
  $.ajax({
    type: 'GET',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: { id },
    success: getOneItemCallback,
    error: errorLogger
  });
  /* ELSE
    $.ajax({
      type: FILL_ME_IN,
      url: FILL_ME_IN,
      contentType: FILL_ME_IN,
      data: FILL_ME_IN,
      success: REPLACE_ME,
      error: REPLACE_ME,
    });
  
    END SOLUTION */
};

var getOneItemCallback = (data) => {
  /* Model this function like the getAllItemsCallback, taking the differences between the requests into account */
  /* START SOLUTION */
  console.log(JSON.parse(data));
  /* ELSE
    // TODO: Log the data for the item that comes back
    END SOLUTION */
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

var addItem = (collection, item) => {
  /* START SOLUTION */
  $.ajax({
    type: 'POST',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: item,
    success: addItemCallback,
    error: errorLogger
  })
  /* ELSE
    $.ajax({
      type: FILL_ME_IN,
      url: FILL_ME_IN,
      data: FILL_ME_IN,
    });
  
    END SOLUTION */
};

var addItemCallback = (response) => {
  /* START SOLUTION */
  console.log(JSON.parse(response));
  /* ELSE
    // TODO: Log the confirmation for the item that comes back
    END SOLUTION */
};

/* HINT: It looks like you're trying to update an existing item in our Foods collection - what type of request could be used to achieve this? */

/* ========== updateItem ========== */
var updateItem = (collection, id, item) => {
  /* START SOLUTION */
  $.ajax({
    type: 'PUT',
    url: `http://127.0.0.1:3000/${collection}/${id}`,
    contentType: "application/json",
    data: item,
    success: updateItemCallback,
    error: errorLogger
  });
  /* ELSE
    $.ajax({
      type: FILL_ME_IN,
      url: FILL_ME_IN,
      data: FILL_ME_IN,
    });
  
    END SOLUTION */
  
};

/* updateItemCallback() should extract the message from the server's response object */
var updateItemCallback = (response) => {
  /* START SOLUTION */
  console.log(JSON.parse(response).data.success);
  /* ELSE
    // TODO: Log the confirmation for the item that was updated
    END SOLUTION */
};

/* ========== deleteItem ========== */
var deleteItem = (collection, id) => {
  /* START SOLUTION */
  $.ajax({
    type: 'DELETE',
    url: `http://127.0.0.1:3000/${collection}`,
    contentType: "application/json",
    data: { id },
    success: deleteItemCallback,
    error: errorLogger
  });
  /* ELSE
    // TODO: Make an AJAX request to delete an item in a collection
  
    END SOLUTION */
};

var deleteItemCallback = (response) => {
  /* START SOLUTION */
  console.log(JSON.parse(response).data.success);
  /* ELSE
    // TODO: Log the confirmation for the item that was deleted
    END SOLUTION */
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