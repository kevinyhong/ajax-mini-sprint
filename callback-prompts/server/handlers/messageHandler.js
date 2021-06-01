let messageCache = {
  0: 'Hey-you-found-me!',
  1: 'Oh-no,-it-seems-the-message-cache-weirdly-manipulates-messages!',
};

let lruTracker = [0, 1];
let messageCount = 2;

const getMessage = (id, callback) => {
  if (messageCache[id]) {
    for (let i = 0; i < lruTracker.length; i++) {
      if (id === lruTracker[i]) {
        lruTracker.splice(i, 1);
        lruTracker.push(id);
        break;
      }
    }
    callback(null, messageCache[id]);
  } else {
    callback(
      new Error(
        `Invalid ID of ${id} given, or current ID does not contain a message.`
      ),
      null
    );
  }
};

const getAllMessages = callback => {
  if (lruTracker.length === 0) {
    callback(new Error('The cache is currently empty.'), null);
  } else {
    const messages = Object.values(messageCache);
    callback(null, messages);
  }
};

const addMessage = (message, callback) => {
  if (typeof message !== 'string') {
    callback(
      new Error(
        `Input type invalid, received "${message}" of type ${typeof message} when expecting input of type "string".`
      ),
      null
    );
  } else {
    let newId;
    if (messageCount === 10) {
      // LRU : Least Recently Used
      const lru = lruTracker.shift();
      messageCache[lru] = message.split(' ').join('-');
      lruTracker.push(lru);
      newId = lru;
    } else {
      messageCache[messageCount] = message.split(' ').join('-');
      lruTracker.push(messageCount);
      newId = messageCount;
      messageCount++;
    }
    callback(null, newId);
  }
};

const updateMessage = (id, newMessage, callback) => {
  if (typeof newMessage !== 'string') {
    callback(
      new Error(
        `Input type invalid, received ${newMessage} of type ${typeof newMessage} when expecting typeof 'string'.`
      ),
      null
    );
  } else {
    if (messageCache[id]) {
      messageCache[id] = newMessage;
      callback(null, `Message ${id} successfully updated.`);
    } else {
      callback(
        new Error(
          `Invalid ID of ${id} given, or current ID does not contain a message.`
        ),
        null
      );
    }
  }
};

const deleteMessage = (id, callback) => {
  if (messageCache[id]) {
    for (let i = 0; i < lruTracker.length; i++) {
      if (id === lruTracker[i]) {
        lruTracker.splice(i, 1);
        delete messageCache[id];
        break;
      }
    }
    callback(null, `Message with ID ${id} deleted.`);
  } else {
    callback(
      new Error(
        `Invalid ID of ${id} given, or current ID does not contain a message.`
      ),
      null
    );
  }
};

const clearCache = (callback) => {
  if (
    messageCache[0] ===
      'Hey-you-found-me!-Oh-no,-it-seems-the-message-cache-weirdly-manipulates-messages.' &&
    messageCount === 2
  ) {
    callback(new Error('The message cache does not need to be reset.'), null);
  } else {
    messageCount = 1;
    messageCache = {
      0: 'Hey-you-found-me!',
      1: 'Oh-no,-it-seems-the-message-cache-weirdly-manipulates-messages.',
    };
    lruTracker = [0];
    callback(null, 'Message cache successfully reset.');
  }
};

module.exports = {
  getMessage: getMessage.bind(this),
  getAllMessages: getAllMessages.bind(this),
  addMessage: addMessage.bind(this),
  updateMessage: updateMessage.bind(this),
  deleteMessage: deleteMessage.bind(this),
  clearCache: clearCache.bind(this),
};
