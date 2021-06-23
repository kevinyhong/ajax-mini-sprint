#  AJAX Calls and HTTP Requests - AJAX Mini-Sprint

## Overview

This mini-sprint is designed to build an understanding of how client-server communications via HTTP requests, Asynchronous Javascript and XML (AJAX), and how we can use these concepts and tools to send and receive data to and from a specified server.

---

## HTTP Request vs AJAX Request

A protocol for applications to take action on data sources is the [Hypertext Transfer Protocol (HTTP)](https://datatracker.ietf.org/doc/html/rfc7231). From fetching HTML documents to creating/updating data stored on another machine in another application, a HTTP request is at the core of these processes. One example of a request that you might be familiar with is when your browser makes a request for the HTML document when you navigate to a web page. 

When you provide a URL in your browser, the browser will send a request to fetch the HTML document related to that URL. After some time, 


---
## JQuery's Ajax Method
Taking [jQuery's ajax method](https://api.jquery.com/jquery.ajax/) as a starting point to understand how we can make requests about data, let's look at an example request to fetch some JSON data about random foods and vehicles that are stored in the sampleData.json that is being served using [json-server](https://www.npmjs.com/package/json-server) (data obtained from the [Random Data API](https://random-data-api.com/documentation)) :


```
$.ajax({
  url: 'https://127.0.0.1:3000/foods/6937',
  method: 'GET',
  success: function (data) {
    // Here we can log the data we get back from Random Data API
    console.log(data)
  },
  error: function (error) {
    // If there's any issues in using the API, we can handle the error that we get back
    console.error(error)
  }
});
```

If the request is successful, we should see some data come back like so:

```
{
  "id":6937,
  "uid":"5a4df2af-451a-4dbb-b50c-8ed199d6dd8f",
  "dish":"Scotch Eggs"
  ,"description":"Breaded fried chicken with waffles. Served with maple syrup.",
  "ingredient":"Garam Masala",
  "measurement":"3 gallon"
}
```

The example above shows a few of the key components required for our AJAX request to provide us with the data we want:
  - a URL that specifies where to find this resource
  - a HTTP method that specifies what we want to do with the resource
  - a function to invoke if the request succeeds
  - a function to invoke if the request fails



---

## What's in a URL?

A [Uniform Resource Locator (URL)](https://url.spec.whatwg.org/#concept-url) is composed of several parts (we'll use the URL when accessing our Gmail account as an example - https://mail.google.com/mail/u/0/#inbox):


  ![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/URI_syntax_diagram.svg/1068px-URI_syntax_diagram.svg.png)


Let's break it down~
  - The scheme - **https**
    - The HOW - this part shows what type of URL we're dealing with. Examples of schemes that you may have seen so far are http, https, file, ftp, git
  - The host (and port) - **mail.google.com**
    - The WHERE - this part tells us where we want to get the resource from
    - Thie host can be broken down further into subdomain (**mail**) and domain (**google.com**)
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
    - A #fragment can point to a more specific portion of the resource that you're trying to access (usually, it's an element on the web page with a given id - the fragment would have to match the element id)
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

This type of request accomplishes the "UPDATE" operation portion of CRUD. For this type of request, the developer must both supply the identifying information of the entry being updated-- often an id-- and the new data which will replace the old data stored at that entry. This is different from PATCH in that it should always initiate a complete replacement of the data being updated-- In essence, it is selecting an entry that already exists and replacing it with entirely new data. Because of this functionality, PUT requests will always produce the same result no matter how many times it is run: whatever is stored at that data entry will always be overwritten in its entirety by whatever data you are passing in the request. This will still be the case even if a PUT request is sent to the wrong address, it will replace what exists there (nothing) with your data. This is not what the method is intended for, (you should do a POST if this is your goal) but, in this situation, it will still execute this way, so be careful about how you're using it!

A PUT request is roughly analagous to replacing your old computer with a brand new one! No matter how many times you do this, "your computer" will always be the brand new one in its entirety-- the old computer has been completely replaced.

**PATCH REQUESTS**

PATCH is another approach to updating existing data. However, it is intended to be used where replacement of only part of the data being updated is necessary. While PUT replaced the whole data entry, PATCH should modify certain properties, but not the entire data resource. You should use this when updating portions of the data while keeping the rest the same-- since you do not want to entirely replace the data in this case, a PATCH is preferable to a PUT.

Continuing the computer analogy, a PATCH request is like switching out a component of your computer (like your CPU) while keeping the rest the same. You can see why this distinction can be important -- buying an entirely new computer to upgrade a single piece would be wasteful and unnecessary!

**DELETE REQUESTS**

This type of request, unsurprisingly, deletes an entry from storage according to the identifying information supplied as a parameter of the request.

**Getting Started**

- [ ] `cd` into the `ajax-and-http/client` folder
- [ ] Run `npm install` to install any local dependencies
- [ ] Start the SpecRunner by running `npm start` in the terminal
- [ ] Open a second terminal window
- [ ] `cd` into the `callback-prompts/server` folder`
- [ ] Run `npm start` to spin up the server locally
- [ ] Fill in the Ajax calls in the AJAX Practice file
- [ ] Fill in the refactored Ajax calls in the Anonymous Refactor file

---

#### Further Resources

[Understanding Javascript Callbacks](https://www.youtube.com/watch?v=Nau-iEEgEoM) (Video)

[jQuery's Ajax](https://api.jquery.com/jquery.ajax/) (Docs)

[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (Docs)

---

#### Collaborators

[Tom Chandler](https://github.com/tmchandler),
Ajax Request Prompts and Testing

[Collin Snyder](https://github.com/Collin-Snyder),
ReadMe Editing

[Matt Co](https://github.com/comatthewb),
ReadMe and Directions Editing, General Refactoring
