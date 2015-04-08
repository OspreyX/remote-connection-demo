(function() {
    'use strict';
    //event listeners.
    //set the adapter ready UI indicator
    var updateAdapterIndicator = function() {
        var statusIndicator = document.querySelector('#status-indicator');
        statusIndicator.classList.toggle("online");
    };

    //set the OpenFin version number on the page
    var setVersionNumber = function() {
        var versionNumberContainer = document.querySelector('#version-number-container'),
            ofVersion = document.querySelector('#of-version');

        fin.desktop.System.getVersion(function(version) {
            ofVersion.innerText = version;
            versionNumberContainer.classList.toggle('invisible');
        });
    };
    var setSendMessageEventHandler = function() {
        var sendMessageButton = document.querySelector('#btn-send-message'),
            messageInput = document.querySelector('#inputMessage');
        sendMessageButton.addEventListener('click', function() {
            sendMessage(messageInput.value);
        });
    };

    var sendMessage = function(message) {
        fin.desktop.InterApplicationBus.publish('inter:app:sub', {
            message: message,
            timeStamp: Date.now()
        });
    };
    var getQueryStringParams = function() {
        var qStringVars = {},
            queryString = location.search.substring(1),
            regularEx = /([^&=]+)=([^&]*)/g,
            m;
        while (m = regularEx.exec(queryString)) { // jshint ignore:line
            qStringVars[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return qStringVars;
    };

    var connectToOpenFin = function(token, uuid) {
        //This is the configuration object needed for external connections, at the moment we are hard coding the PORT and ssl.
        var config = {
            token: token,
            app_uuid: uuid,
            name: uuid,
            port: 9696,
            ssl: false,
            fulfilled: true
        };
        fin.desktop.connect(config);
    };

    document.addEventListener('DOMContentLoaded', function() {
        //Get the query string parameters and connect to OpenFin:
        var queryStringParams = getQueryStringParams();
        connectToOpenFin(queryStringParams.token, queryStringParams.uuid);

        //OpenFin is ready
        fin.desktop.main(function() {
            //update UI and set event handlers.
            updateAdapterIndicator();
            setVersionNumber();
            setSendMessageEventHandler();
            sendMessage('Browser connected!');
        });
    });

}());
