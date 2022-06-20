export class Keyboard {
    static #PRESSED_KEYS = []; // List of keys and their state
    static #REGISTERED_KEYS = {}; // All keys associated with an event
    static #KEY_EVENTS = {}; // Registered events
    static #EVENT_ID = 0;

    static initialize() {
        window.addEventListener('keydown', function(event) {
            event.preventDefault();

            // Some browsers will fire this event multiple times while the key is pressed.
            // This if statement prevents the registered event from firing multiple times.
            if (Keyboard.#PRESSED_KEYS[event.key] !== true) {
                Keyboard.#PRESSED_KEYS[event.key] = true;

                Keyboard.#checkEvents(event.key);
            }
        });

        window.addEventListener('keyup', function(event) {
            event.preventDefault();

            if (Keyboard.#PRESSED_KEYS[event.key] !== false) {
                Keyboard.#PRESSED_KEYS[event.key] = false;

                Keyboard.#checkEvents(event.key);
            }
        });
    }

    static #checkEvents(key) {
        if (!Keyboard.#REGISTERED_KEYS[key]) {
            return; // If the key is not registered
        }

        // Check all events associated
        for (let i = 0; i < Keyboard.#REGISTERED_KEYS[key].length; i++) {
            let eventId = Keyboard.#REGISTERED_KEYS[key][i];
            let event = Keyboard.#KEY_EVENTS[eventId];

            // Check if all keys for this event are in the same state
            let keysInSameState = true;
            for (let ki = 0; ki < event.keys.length; ki++) {
                if (Keyboard.#PRESSED_KEYS[event.keys[ki]] !== Keyboard.#PRESSED_KEYS[key]) {
                    keysInSameState = false;
                    break;
                }
            }

            // If all keys are in the same state, and the current state of the event is not the same as the keypress.
            if (keysInSameState && event.pressed !== Keyboard.#PRESSED_KEYS[key]) {
                event.pressed = Keyboard.#PRESSED_KEYS[key];

                if (typeof event.callback === 'function') {
                    event.callback(event.pressed);
                }
            }
        }
    }

    static onKeyChanged(keys, callback) {
        for (let i = 0; i < keys.length; i++) {
            if (!Keyboard.#REGISTERED_KEYS[keys[i]]) {
                Keyboard.#REGISTERED_KEYS[keys[i]] = [];
            }

            // The registered_keys map is intended to provide a fast lookup for events.
            // When a key state has changed, the registered_keys map will be checked for events.

            Keyboard.#REGISTERED_KEYS[keys[i]].push(Keyboard.#EVENT_ID);
            Keyboard.#KEY_EVENTS[Keyboard.#EVENT_ID] = {
                keys: keys,
                callback: callback,
                pressed: false
            };

            Keyboard.#EVENT_ID++;
        }
    }

    static keyDown(key) {
        return Keyboard.#PRESSED_KEYS[key] ?? false;
    }
}
