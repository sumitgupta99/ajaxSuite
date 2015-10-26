# ajaxSuite
> The Super "Ajaxoic" framework.

###Introduction:
> This tiny javascript library can be used to trigger cross browser ajax requests. Its incredibly small size, ability to be chained and managed javascript resources make it really powerful in cases where you just need a library to trigger ajax requests. This library does not have any dependency.

###Getting Started:
  - Include the ajaxSuite.min.js file in ur html file.
  - Call the ajaxSuite Javascript Object in ur Javascript Code and pass on the relevant configuration.
  - That's all. See, that was easy.

###Example:
```sh
ajaxSuite.request({
        url: "data.json",
        method: 'GET',
        async: true
    })
    .done(callback)
    .fail(callback)
    .always(callback);

    function callback(data, xhr) {
        debugger;
    }
```
###Version:
> 1.0.0

###License:
> MIT License
