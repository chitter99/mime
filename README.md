# Mime
Small Javascript library for requesting mime string's of a remote resources. 

Basicly it request a resource via `HEAD` method (to save bandwidth) and returns the `Content-Type` header. 

## Problems
You currently cannot use this library under the following contitions:
* The remote resource has no `Access-Control-Origin` header or it explicit disallows cross side request.
* The remote resource does not define the `Control-Type` header.

The cross side request problem will be solved in the future via a fallback proxy. Currently *not* implemented.

## Demo
See the example in the repo for a demonstration.

## Usage
The only function you need to know is the `get` function. It returns a Promise with getting the `Content-Type` header for you.
```
var url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chili_dog_with_fries.jpg/1920px-Chili_dog_with_fries.jpg";
mime.get(ur).then(function(m) {
  console.log(m);
});
```

## To-Do
* Requesting via proxy
* Method for requesting via sync XMLHttpRequest
