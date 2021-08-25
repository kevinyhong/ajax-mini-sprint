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