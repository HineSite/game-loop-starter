import { GameLoop } from './GameLoop.js';

(function () {
    let debugLogs = true;
    let gameLoop = new GameLoop(onUpdate, onDraw, onStart, onStop, onPause, onResume, 60);

    gameLoop.logger = (type, message) => {
        logType(type, message);
    };

    gameLoop.initialize(() => {
    });

    function onUpdate (delayMilli, delaySeconds) {
    }

    function onDraw (delayMilli, delaySeconds) {
    }

    function onStart () {
        log(GameLoop.LogType.INFO, 'Loop State', 'Started');
    }

    function onStop () {
        if (gameLoop.loopState !== GameLoop.LoopState.STOPPED)
            return;

        log(GameLoop.LogType.INFO, 'Loop State', 'Stopped');
    }

    function onPause () {
        if (gameLoop.loopState !== GameLoop.LoopState.PAUSED)
            return;

        log(GameLoop.LogType.INFO, 'Loop State', 'Paused');
    }

    function onResume () {
        log(GameLoop.LogType.INFO, 'Loop State', 'Resumed');
    }

    function log(type, title, message) {
        logType(type, title + ': ' + message);
    }

    function logType(type, message) {
        if (!debugLogs && type === GameLoop.LogType.DEBUG)
            return;

        console.log(type.description + ' - ' + message);
    }
})();
