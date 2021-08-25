#  AJAX Calls and HTTP Requests - AJAX Mini-Sprint

## Overview

This mini-sprint is designed to build an understanding of how client-server communications via HTTP and Asynchronous Javascript and XML (AJAX) requests, and how we can use these concepts and tools to send and receive data to and from a specified server.


---

## HTTP Request vs AJAX Request

A protocol for applications to take action on data sources is the [Hypertext Transfer Protocol (HTTP)](https://developer.mozilla.org/en-US/docs/Web/HTTP). From fetching HTML documents to creating/updating data stored on another machine in another application, a HTTP request is at the core of these processes. One example of a request that you might be familiar with is when your browser makes a request for the HTML document when you navigate to a web page.

While your browser might be making requests for the HTML document, style sheets, and scripts that are specified in the initial document, what if you wanted to fetch data that might be useful for your application or that you might want to display to the user (say your account balance) without hard-coding that into the document? That's where [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started) comes in: an AJAX request allows your applications to make HTTP requests to interact with resources without reloading the page.


---

## AJAX is Asynchronous

Because it takes some time for the request to reach it's destination and the browser doesn't know how long it'll take to receive a response back with the document we want, this process of sending a HTTP request and handling the associated response is typically [asynchronous](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests) to prevent any blocking behavior when making the request. Because you don't know exactly when the response will arrive, you need to specify a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) to be executed when our application receives the response. You can specify multiple callback functions based on the type of response you receive - an example would be in the event that we don't receive a successful response to our request, we may want our application to behave differently (think about unsuccessfully logging into your email account due to a email/password typo).


---

## JQuery's Ajax Method
Taking [jQuery's ajax method](https://api.jquery.com/jquery.ajax/) as a starting point to understand how we can make requests about data, let's look at an example request to fetch some JSON data about random foods. We'll make a request to the [Random Data API](https://random-data-api.com/documentation) that are stored in the sampleData.json that is being served using [json-server](https://www.npmjs.com/package/json-server) (data obtained from the [Random Data API](https://random-data-api.com/documentation)):


```
$.ajax({
  url: 'https:random-data-api.com/api/foods/random_food',
  method: 'GET',
  success: function (data) {
    // Here we log the data we get back from Random Data API
    console.log(data)
  },
  error: function (error) {
    // If there's any issues in using the API, we write the error provided in the response to our console
    console.error(error)
  }
});
```

If the request is successful, we should see some JSON data come back:

```
{
  "id":6937,
  "uid":"5a4df2af-451a-4dbb-b50c-8ed199d6dd8f",
  "dish":"Scotch Eggs",
  "description":"Breaded fried chicken with waffles. Served with maple syrup.",
  "ingredient":"Garam Masala",
  "measurement":"3 gallon"
}
```

The example above shows a few of the key components required for our AJAX request to provide us with the data we want:
  - a URL that specifies where to find this resource
  - a HTTP method that specifies what we want to do with the resource
  - a function to invoke if the request succeeds
  - a function to invoke if the request fails for any particular reason


---

## Getting Started

- [ ] `cd` into the `ajax-and-http` folder
- [ ] Run `npm install` to install any local dependencies
- [ ] Start the json-server by running `npm start` in the terminal
- [ ] Open a second terminal window
- [ ] Run `npm test` to spin up SpecRunner
- [ ] Fill in the refactored Ajax calls in the Intro To AJAX practice file
- [ ] Work through the Message Requests file


---

## Advanced Content

jQuery's AJAX method is not the only way that we can make AJAX requests in the browser, there are several other tools that can also accomplish this same task:

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) - the underlying API for making requests (jQuery uses a custom XHR object if you dig into the source code)
- [Axios](https://www.npmjs.com/package/axios) - a [promise-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) external library that allows us to make HTTP requests
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - also a promise-based API built into the browser similar to axios

- [ ] Explore how promises work in the context of asynchronous code execution
- [ ] Refactor the previous exercises using any of the above tools


---

#### Further Resources

[Chatterbox Exercise in gLearn](https://learn-2.galvanize.com/content_link/github.com/gSchool/sei.sprint.client-side-concepts/Browser%20Apps,%20jQuery,%20and%20Ajax/exercises/chatterbox-client.md)

[Understanding Javascript Callbacks](https://www.youtube.com/watch?v=Nau-iEEgEoM) (Video)

[jQuery's AJAX method](https://api.jquery.com/jquery.ajax/) (Docs)

See the docs directory for additional information on URLs and common HTTP methods


---

#### Collaborators

[Tom Chandler](https://github.com/tmchandler),
Ajax Request Prompts and Testing

[Collin Snyder](https://github.com/Collin-Snyder),
ReadMe Editing

[Matt Co](https://github.com/comatthewb),
ReadMe and Directions Editing, General Refactoring
