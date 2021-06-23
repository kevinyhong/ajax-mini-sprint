// For the purposes of this exercise, use the function below for your error handling callback in all Ajax calls.
const errorLogger = (err) => {
  console.log("Oops! There was an error.");
  console.error(err);
};

/* ========== getAll ========== //
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
const getAllFoods = () => {
  $.ajax({
    type: /* FILL_ME_IN */,
    url: "http://127.0.0.1:3000/foods",
    contentType: "application/json",
    success: /* FILL_ME_IN */,
    error: /* FILL_ME_IN */,
  });
};

const getAllFoodsCallback = (data) => {
  const foods = JSON.parse(data);
  const dinner = foods[Math.floor(foods.length * Math.random())];
  console.log(`Looks like we'll be having ${/* FILL_ME_IN */} for dinner tonight!`);
};

/* ========== getOne ========== /
 * Fix the call below!
 *
 * HINT: There is specific behavior for how Ajax sends GET requests with parameters. How might this relate
 * to the differences between the desired return of "getOne" and "getAll?"
 */
const getOneFood = (id) => {
  $.ajax({
    /* FILL_ME_IN */
    url: "http://127.0.0.1:3000/foods",
    contentType: "application/json",
    data: /* FILL_ME_IN */,
    /* FILL_ME_IN */
  });
};

const getOneFoodCallback = (data) => {
  /* Model this function like the getAllFoodsCallback, taking the differences between the requests into account */
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

/* ========== addFood ========== */

/*
HINT: What type of HTTP request should you be using to add a food item to our storage?
*/

const addFood = (message) => {
  /* FILL_ME_IN */
};

const addFoodCallback = (data) => {
  /* FILL_ME_IN */
};

/* HINT: It looks like you're trying to update an existing food item in storage-- what type of request could be used to achieve this? */

/* ========== updateFood ========== */
const updateFood = (id, message) => {
  /* FILL_ME_IN */
};

const updateFoodCallback = (data) => {
  /* FILL_ME_IN */
};

/* ========== deleteFood ========== */
const deleteFoodMessage = (id) => {
  /* FILL_ME_IN */
};

const deleteFoodCallback = (data) => {
  /* FILL_ME_IN */
};

/* If you take a look at our sampleData.json file, you'll see that there's another collection that we can interact with. Similar to the  */

// COMMENT: There's an opportunity to talk about the difference in use cases for PUT and PATCH requests here (or at least to reference material in the README)
// INSTRUCTIONAL CHANGE/ADDITION: Could spend more time having students refactor provided Node HTTP server to use Express instead as an additional exercise