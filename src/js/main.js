(function(window) {
    'use strict';

    function define_ajaxSuite() {
        var ajaxSuite = {};

        ajaxSuite.request = function(options) {
            //Set the defaults
            if (typeof options == 'string') options = {
                url: options
            };
            options.url = options.url || '';
            options.method = options.method || 'GET';
            options.params = options.params || {};
            options.async = options.async || 1;

            try {
                //Construct the ajax request
                var x = createXMLHTTPObject();
                if(options.method == 'GET') {
                    x.open(options.method, options.url + getParams(options.params, options.url), options.async);
                } else {
                    x.open(options.method, options.url, options.async);
                    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }
                x.onreadystatechange = function() {
                    ajaxSuite.progressCallback && ajaxSuite.progressCallback(this.responseText, this);
                    if(this.readyState > 3){
                        if(this.status == 200){
                            ajaxSuite.__doneCallback && ajaxSuite.__doneCallback(this.responseText, this);
                            ajaxSuite.__alwaysCallback && ajaxSuite.__alwaysCallback(this.responseText, this);
                        }
                        else{
                            ajaxSuite.__failCallback && ajaxSuite.__failCallback(this.responseText, this);
                            ajaxSuite.__alwaysCallback && ajaxSuite.__alwaysCallback(this.responseText, this);
                        }
                    }
                };
                setTimeout(function() { 
                    options.method == 'GET' ? x.send() : x.send(getParams(options.params)); 
                }, 20);
            } catch (e) {
                window.console && console.log(e);
            }
            return this;
        };

        ajaxSuite.done = function(callback) {
            this.__doneCallback = callback;
            return this;
        };
        ajaxSuite.fail = function(callback) {
            this.__failCallback = callback;
            return this;
        };
        ajaxSuite.always = function(callback) {
            this.__alwaysCallback = callback;
            return this;
        };

        ajaxSuite.progress = function(callback) {
            this.__progressCallback = callback;
            return this;
        };

        var XMLHttpFactories = [
            function() {
                return new XMLHttpRequest();
            },
            function() {
                return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function() {
                return new ActiveXObject("Msxml3.XMLHTTP");
            },
            function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];

        function createXMLHTTPObject() {
            var xmlhttp = false;
            for (var i = 0; i < XMLHttpFactories.length; i++) {
                try {
                    xmlhttp = XMLHttpFactories[i]();
                } catch (e) {
                    continue;
                }
                break;
            }
            return xmlhttp;
        }

        function getParams(data, url) {
            var arr = [],
                str;
            for (var name in data) {
                arr.push(name + '=' + encodeURIComponent(data[name]));
            }
            str = arr.join('&');
            if (str != '') {
                return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
            }
            return '';
        }

        return ajaxSuite;
    }

    //define globally if it doesn't already exist
    if (typeof(ajaxSuite) === 'undefined') {
        window.ajaxSuite = define_ajaxSuite();
    } else {
        console.log("AjaxSuite already defined.");
    }
})(window);
