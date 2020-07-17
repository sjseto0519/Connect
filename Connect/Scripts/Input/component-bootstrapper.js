ko.observable.fn.silentUpdate = function (value) {
    this.notifySubscribers = function () { };
    this(value);
    this.notifySubscribers = function () {
        ko.subscribable.fn.notifySubscribers.apply(this, arguments);
    };
};