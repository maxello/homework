'use strict';

(function () {
    function Stopwatch(requiresNode) {
        this.root = requiresNode;
        this.buildDOM();
        this.laps = [];
        this.indicatorNode = this.root.querySelector('.display');
        this.lapsListNode = this.root.querySelector('.results');
        this.startStopButtonNode = this.root.querySelector('.start');
        this.lapButtonNode = this.root.querySelector('.lap');
        this.resetButtonNode = this.root.querySelector('.reset');
        this.elapsedTime = 0;
        this.intervalId = null;
        this.bindEvents();
    }

    Stopwatch.prototype.buildDOM = function () {
        this.root.innerHTML = "<div class='container'><div><span class='display'>00:00:00.000</span></div><ul class='buttons'><li class='start'>Start</li><li class='lap'>Lap</li><li class='reset'>Reset</li></ul><div class='hotkeys'><b>S</b> - start/stop, <b>L</b> - lap, <b>R</b> - reset</div><ul class='results'></ul></div>";
    };

    Stopwatch.prototype.drawTime = function () {
        this.indicatorNode.textContent = this.formatTime(this.elapsedTime);
    };

    Stopwatch.prototype.formatTime = function (elapsedTime) {
        var hours = Math.floor(elapsedTime / 1000 / 60 / 60);
        var minutes = Math.floor((elapsedTime - hours * 60 * 60 * 1000) / 1000 / 60);
        var seconds = Math.floor(((elapsedTime - hours * 60 * 60 * 1000) - minutes * 60 * 1000) / 1000);
        var mseconds = Math.floor(((elapsedTime - hours * 60 * 60 * 1000) - (minutes * 60 * 1000) - (seconds * 1000)));
        if (mseconds <= 99 && mseconds > 9) {
            mseconds = '0' + mseconds;
        } else if (mseconds <= 9) {
            mseconds = '00' + mseconds;
        }
        if (seconds <= 9) {
            seconds = '0' + seconds
        }
        if (minutes <= 9) {
            minutes = '0' + minutes
        }
        if (hours <= 9) {
            hours = '0' + hours
        }
        return hours + ':' + minutes + ':' + seconds + '.' + mseconds;
    };

    Stopwatch.prototype.stop = function () {
        clearInterval(this.intervalId);
        this.startStopButtonNode.textContent = 'Start';
        this.intervalId = null;
    };

    Stopwatch.prototype.start = function () {
        if (this.intervalId) {
            this.stop();
            return;
        }
        this.startStopButtonNode.textContent = 'Stop';
        var _this = this;
        var lastUpdateTime = (new Date()).getTime();
        this.intervalId = setInterval(function () {
            var nextTicTime = (new Date()).getTime();
            _this.elapsedTime += (nextTicTime - lastUpdateTime);
            lastUpdateTime = nextTicTime;
            _this.drawTime();
        }, 16);
    };

    Stopwatch.prototype.reset = function () {
        this.stop();
        this.laps = [];
        this.drawTime();
        this.indicatorNode.innerHTML = '00:00:00.000';
        this.elapsedTime = 0;
        this.drawLaps();
    };

    Stopwatch.prototype.drawLaps = function () {
        var _this = this;
        if (this.lapsListNode.firstChild) {
            this.lapsListNode.innerHTML = "";
        }
        this.laps.forEach(function (lap, lapsIndex) {
            var lapNode = document.createElement('li');
            lapNode.textContent = _this.formatTime(lap);
            var removeButton = document.createElement('span');
            lapNode.appendChild(removeButton);
            removeButton.className = 'remove-button';
            removeButton.textContent = '×';
            lapNode.querySelector('.remove-button').addEventListener('click', function () {
                _this.removeLap(lapsIndex);
            }, false);
            _this.lapsListNode.appendChild(lapNode);
        });

    };

    Stopwatch.prototype.lap = function () {
        if (this.laps[0] === this.elapsedTime) {
            return;
        }
        if (this.elapsedTime === 0) {
            return;
        }
        this.laps.unshift(this.elapsedTime);
        this.drawLaps();
    };
    Stopwatch.prototype.removeLap = function (index) {
        this.laps.splice(index, 1);
        this.drawLaps();
    };

    Stopwatch.prototype.bindEvents = function () {
        var _this = this;
        this.startStopButtonNode.addEventListener('click', this.start.bind(this), false);
        this.lapButtonNode.addEventListener('click', this.lap.bind(this), false);
        this.resetButtonNode.addEventListener('click', this.reset.bind(this), false);
        this.root.addEventListener('mouseenter', function () {
            Stopwatch.lastActive = _this;
        }, false);
        document.addEventListener('keyup', function (event) {
            if (Stopwatch.lastActive == _this) {
                if (event.keyCode === 83) {
                    _this.start();
                }
                if (event.keyCode === 76) {
                    _this.lap();
                }
                if (event.keyCode === 82) {
                    _this.reset();
                }
            }
        }, false);
    };

    window.Stopwatch = Stopwatch;
})();