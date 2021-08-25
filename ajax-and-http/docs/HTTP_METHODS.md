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