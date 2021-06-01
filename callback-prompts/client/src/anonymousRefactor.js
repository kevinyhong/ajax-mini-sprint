/*
 * Refactor the calls from the movingToAsync step so that the success callbacks are IN-PLACE and ANONYMOUS.
 * However, this time instead of passing the process data into a console.log, hand the data to the
 * callback passed into the function. This should seem familiar from the last section--note the differences
 * between anonymous callbacks and those explicitly named within the success callback method in the AJAX
 * requests. Do not copy and paste from the movingToAsync step!
 *
 * Make sure you're still handling errors! How you do so is up to you.
 *
 * Reminder: if the only errors in your spec are "Timeout of 2000ms exceeded", and the callbacks
 * are being properly invoked, double check that you've started your server in a terminal.
 */

const getAllAnon = (callback) => {
  // FILL_ME_IN
};

const getOneAnon = (id, callback) => {
  // FILL_ME_IN
};

const sendMessageAnon = (newMessage, callback) => {
  // FILL_ME_IN
};

const updateMessageAnon = (id, newMessage, callback) => {
  // FILL_ME_IN
};

const deleteMessageAnon = (id, callback) => {
  // FILL_ME_IN
};
