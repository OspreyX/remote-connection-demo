(function() {
    'use strict';

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

    //add the event listener for the learn more button.
    var setlaunchBrowserEventHandler = function() {
        var launchBrowserButton = document.querySelector('#launch-browser');

        launchBrowserButton.addEventListener('click', function() {
            var uuid = 'remote-connection-' + Math.random().toString(36).substring(7);
            fin.desktop.System.registerExternalConnection(uuid, function(config) {
                fin.desktop.System.openUrlWithBrowser(document.URL.replace('index.html', 'external.html') + '?uuid=' + uuid + '&token=' + config.token);
                document.querySelector('#token').innerText = config.token;
                document.querySelector('#uuid').innerText = uuid;
            });
        });
    };

    var setVisibilityDisplayOnce = function() {
        document.querySelector('#inter-app-messages').style.display = 'block';
        setVisibilityDisplayOnce = function() {};
    };

    var subscribeToInterAppBus = function() {
        var messageCtrl = document.querySelector('#message'),
            timeStampCtrl = document.querySelector('#time');

        fin.desktop.InterApplicationBus.subscribe('*', 'inter:app:sub', function(msg) {
            setVisibilityDisplayOnce();
            messageCtrl.innerText = msg.message;
            timeStampCtrl.innerText = new Date(msg.timeStamp).toLocaleTimeString();
        });
    };

    //event listeners.
    document.addEventListener('DOMContentLoaded', function() {
        //OpenFin is ready
        fin.desktop.main(function() {
            //update UI and set event handlers.
            updateAdapterIndicator();
            setVersionNumber();
            setlaunchBrowserEventHandler();
            subscribeToInterAppBus();
        });
    });
}());
