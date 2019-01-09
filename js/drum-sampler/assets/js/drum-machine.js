(function () {
    /**
     * Constants
     * @type {String}
     */
    var ATTRIBUTE_KEY = 'data-key';

    var CLASSNAME_KEY = 'key';
    var CLASSNAME_KEY_ACTIVWE = 'key--active';

    var TAGNAME_AUDIO = 'audio';

    var EVENT_TYPE = 'click';

    var CSS_TRANSITION_TIME_VALUE_FOR_ACTIVE_BUTTON = 70; // must be equal value of transition-time for class 'key'

    /**
     * arrayOfKeysIntoKeysDOMElements - array of dom elements with the "key" value class from buttons wrapper
     * arrayOfKeysIntoAudioDOMElements - array of dom elements with tag value "audio"
     * arrayOfKeysIntoKeysValues - array of all attribute "data-key" values of array arrayOfKeysIntoKeysDOMElements
     * arrayOfKeysIntoAudioValuesAssoc - assoc array of all attribute "data-key" values of array arrayOfKeysIntoAudioDOMElements
     */

    var arrayOfKeysIntoKeysDOMElements = document.getElementsByClassName(CLASSNAME_KEY);
    var arrayOfKeysIntoAudioDOMElements = document.getElementsByTagName(TAGNAME_AUDIO);
    var arrayOfKeysIntoKeysValues = [];
    var arrayOfKeysIntoAudioValuesAssoc = {};

    document.onkeydown = OnKeyDownHandler;

    for(var i = 0; i<=arrayOfKeysIntoKeysDOMElements.length; i++) {
        if (arrayOfKeysIntoKeysDOMElements[i]) {
            arrayOfKeysIntoKeysValues.push(Number.parseInt(arrayOfKeysIntoKeysDOMElements[i].getAttribute(ATTRIBUTE_KEY)))
            arrayOfKeysIntoKeysDOMElements[i].addEventListener(EVENT_TYPE, OnClickHandler);
        }
    }

    for(var j = 0; j<=arrayOfKeysIntoAudioDOMElements.length; j++) {
        if (arrayOfKeysIntoAudioDOMElements[j]) {
            arrayOfKeysIntoAudioValuesAssoc[arrayOfKeysIntoAudioDOMElements[j].getAttribute(ATTRIBUTE_KEY)]
                = arrayOfKeysIntoAudioDOMElements[j];
        }
    }

    function OnClickHandler(e) {
        var arrayPathToTriggeredElement = e.path;
        for (var indexOfActiveKey=0; indexOfActiveKey<=arrayPathToTriggeredElement.length; indexOfActiveKey++) {
            if (arrayPathToTriggeredElement[indexOfActiveKey]
                && arrayPathToTriggeredElement[indexOfActiveKey].classList
                && arrayPathToTriggeredElement[indexOfActiveKey].classList.contains(CLASSNAME_KEY)) {
                playAudio(arrayPathToTriggeredElement[indexOfActiveKey].getAttribute(ATTRIBUTE_KEY), arrayPathToTriggeredElement[indexOfActiveKey]);
            }
        }

    }

    function OnKeyDownHandler(e) {
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        var indexOfActiveKey = arrayOfKeysIntoKeysValues.indexOf(charCode);
        if (indexOfActiveKey !== -1) {
            playAudio(charCode, arrayOfKeysIntoKeysDOMElements[indexOfActiveKey])
        }
    }

    function playAudio(keyKode, elemButton) {
        if (window.theLastUsedKey) {
            eventStopAudio();
        }
        addClassToElement(elemButton);
        eventPlayAudio(keyKode);
        removeClassFromElement(elemButton);

    }

    function eventStopAudio() {
        arrayOfKeysIntoAudioValuesAssoc[window.theLastUsedKey].pause();
        arrayOfKeysIntoAudioValuesAssoc[window.theLastUsedKey].currentTime = 0;
    }

    function eventPlayAudio(keyKode) {
        if (!arrayOfKeysIntoAudioValuesAssoc[keyKode].error) {
            arrayOfKeysIntoAudioValuesAssoc[keyKode].play();
            window.theLastUsedKey = keyKode;
        } else {
            returnError(arrayOfKeysIntoAudioValuesAssoc[keyKode].currentSrc);
        }
    }

    function addClassToElement(elemButton) {
        elemButton.classList.add(CLASSNAME_KEY_ACTIVWE);
    }

    function removeClassFromElement(elemButton) {
        setTimeout(function() {
            elemButton.classList.remove(CLASSNAME_KEY_ACTIVWE)
        }, CSS_TRANSITION_TIME_VALUE_FOR_ACTIVE_BUTTON);
    }

    function returnError(error) {
        console.error('Error: audio file' + error + 'does\'t loaded');
    }

})();