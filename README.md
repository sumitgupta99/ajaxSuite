# ajaxSuite
The Super "Ajaxoic" framework.

###Getting Started
  - Include the ajaxSuite.min.js file in ur html file.
  - Call the ajaxSuite Javascript Object in ur Javascript Code and pass on the relevant information
  - That's all. See, that was easy.

###Example
```sh
ajaxSuite.request({
        url: "data.json",
        method: 'GET',
        callback: callback,
        async: true
    })
    .done(callback)
    .fail(callback)
    .always(callback);

    function callback(data, xhr) {
        debugger;
    }
```

###Version
1.0.0

###License
MIT License
