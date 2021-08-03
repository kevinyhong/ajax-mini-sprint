#  AJAX Calls and HTTP Requests - AJAX Mini-Sprint

## Overview

This mini-sprint is designed to build an understanding of how client-server communications via HTTP requests, Asynchronous Javascript and XML (AJAX), and how we can use these concepts and tools to send and receive data to and from a specified server.

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

If the request is successful, we should see some data come back like so:

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

## What's in a URL?

A [Uniform Resource Locator (URL)](https://developer.mozilla.org/en-US/docs/Glossary/URL) is composed of several parts (we'll use the URL when accessing our Gmail account as an example - https://mail.google.com/mail/u/0/#inbox):


  ![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/URI_syntax_diagram.svg/1068px-URI_syntax_diagram.svg.png)


[Let's break it down~](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)
  - The scheme - **https**
    - The HOW - this part shows what type of URL we're dealing with. Examples of schemes that you may have seen so far are http, https, file, ftp, git
  - The host (and port) - **mail.google.com**
    - The WHERE - this part tells us where we want to get the resource from
    - The host can be broken down further into subdomain (**mail**) and domain (**google.com**)
    - There are several [default ports](https://url.spec.whatwg.org/#special-scheme) dedicated to specific protocols which may be inferred from the scheme used (they don't always show up!)
      - If the service/application you are interacting with is operating on a port different from the default port of the scheme OR there is no default port for the scheme, you would need to include the port number after the host (for example: http://localhost:3000 - the default port for the http scheme is 80, but the application is running on port 3000)
  - The path - **/mail/u/0/#inbox**
    - The WHAT - this part tells us where to look for the resource on the host
    - The path can include several additional parameters to make the request more specific
      - Route parameters (/mail/u/**:id**/#inbox) are built into the path and can typically be though of as required variables - in this example, if you have more than one Google account logged into your browser, you can switch between them using the :id parameter (defaults to 0 and can increase for each user - see example down below)
      - Query parameters represent additional information associated with a request in the form of key-value pairs (separated by & if there is more than one parameter)
      - Example of query parameters in use - https://www.amazon.com/s?k=hackers&i=instant-video&ref=nb_sb_noss - looks like there are 3 parameters specified in the URL:
        - k: "hackers"
        - i: "instant-video"
        - ref: "nb_sb_noss"
    - NOTE: be mindful that both types of parameters are exposed during a request since they are included in the URL, so including sensitive information is **not advisable**
    - An #anchor (or #fragment) can point to a bookmarked portion of the page for easier access
      - When looking at the [URL standard](https://url.spec.whatwg.org/), you can refer to specific parts of the document by using different fragments
        - https://url.spec.whatwg.org/#special-scheme - shows you special schemes (and their ports)
        - https://url.spec.whatwg.org/#concept-url - shows you how URLs can be represented


---

## HTTP Methods 

**There are a number of HTTP method types, each of which is responsible for manipulating server-side data, often to achieve one of the four CRUD (Create, Read, Update, Delete) operations. For this sprint, this is achieved through AJAX requests.**

**While using the wrong method will not, in every case, throw an error, adhering to RESTful conventions (using the proper HTTP method) is always best practice and is a vital piece of writing clean, readable code**

**GET REQUESTS**

This type of request fulfills the "READ" operation portion of CRUD, effectively requesting the server to return the data stored at a specific route (usually within a database, but we'll get to that in future sprints). GET requests in their most basic form will return a response object containing the desired data. For applications in which a specific value must be returned, passing identifying information as a parameter of the request will return the data to which the information matches-- this identifying information is often an id.

A common example of a GET request for specific information:

In the following URL below, /u/:id/#inbox specifies to retrive the inbox from the user (/u/) with the id ('/0/').

https://mail.google.com/mail/u/0/#inbox

Simply changing the id ('/0/' to '/1/') retrieves the inbox for a different user. This id is what is being passed as part of the GET request, and provided our server routes are set up to receive this id (you'll learn how to do that later) allows for easy access to targeted data that you wish to return-- in this case, the inbox associated with a specified user.

https://mail.google.com/mail/u/1/#inbox

If you have multiple gmail accounts, try this out in your own browser!

**POST REQUESTS**

This type of request occupies the "CREATE" operation portion of CRUD. Sending this type of request will insert the data passed into the request into a new entry in server-side storage.

**PUT REQUESTS**

This type of request accomplishes the "UPDATE" operation portion of CRUD. For this type of request, the developer must both supply the identifying information of the entry being updated-- often an id-- and the new data which will replace the old data stored at that entry. This is different from PATCH in that it should always initiate a complete replacement of the data being updated-- In essence, it is selecting an entry that already exists and replacing it with entirely new data. Because of this functionality, PUT requests will [always produce the same result no matter how many times it is run](https://en.wikipedia.org/wiki/Idempotence#Computer_science_examples): whatever is stored at that data entry will always be overwritten in its entirety by whatever data you are passing in the request. This will still be the case even if a PUT request is sent to the wrong address, it will replace what exists there (nothing) with your data. This is not what the method is intended for, (you should do a POST if this is your goal) but, in this situation, it will still execute this way, so be careful about how you're using it!

A PUT request is roughly analagous to replacing your old computer with a brand new one! No matter how many times you do this, "your computer" will always be the brand new one in its entirety-- the old computer has been completely replaced.

**PATCH REQUESTS**

PATCH is another approach to updating existing data. However, it is intended to be used where replacement of only part of the data being updated is necessary. While PUT replaced the whole data entry, PATCH should modify certain properties, but not the entire data resource. You should use this when updating portions of the data while keeping the rest the same-- since you do not want to entirely replace the data in this case, a PATCH is preferable to a PUT.

Continuing the computer analogy, a PATCH request is like switching out a component of your computer (like your CPU) while keeping the rest the same. You can see why this distinction can be important -- buying an entirely new computer to upgrade a single piece would be wasteful and unnecessary!

**DELETE REQUESTS**

This type of request, unsurprisingly, deletes an entry from storage according to the identifying information supplied as a parameter of the request.

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

---

#### Collaborators

[Tom Chandler](https://github.com/tmchandler),
Ajax Request Prompts and Testing

[Collin Snyder](https://github.com/Collin-Snyder),
ReadMe Editing

[Matt Co](https://github.com/comatthewb),
ReadMe and Directions Editing, General Refactoring
