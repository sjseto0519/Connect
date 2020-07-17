var _ = window._;

var ev = (function () {

    //tracks subscriptions by event (keyed by string)
    var _eventMap = new Map();

    //tracks subscriptions by the object that created the subscribers (keyed by object)
    var _objectMap = new WeakMap();

    var EventAggregator = function () {
        
    }

    //Subscription Model
    var Subscription = function (event, handler, obj) {

		if (!obj)
		{
			obj = null;
		}
	
        var self = this;

        self.Event = event;
        self.Handler = handler;
        self.Object = obj;

        //add self to event subs
        var eventSubs = _eventMap.get(event) || [];
        eventSubs.push(self);
        _eventMap.set(event, eventSubs);

        //add self to object subs
        if (obj !== null && typeof obj === "object") {

            var objSubs = _objectMap.get(obj) || [];
            objSubs.push(self);
            _objectMap.set(obj, objSubs);

        }

        //removes the subscription from the object map and event map
        self.unsubscribe = function () {

            // non-native WeakMap (still used in old versions of Chrome, for example) 
            // will throw an error when you pass a null into the get() 
            if (obj !== null && typeof obj === "object") {

                var objectSubscribers = _objectMap.get(self.Object);
                if (objectSubscribers) {

                    _.pull(objectSubscribers, self);


                }
            }

            var eventSubscribers = _eventMap.get(self.Event);
            if (eventSubscribers) {

                _.pull(eventSubscribers, self);

            }

            self.Event = self.Handler = self.Object = null;

        }

    }

    //registers a subscriber
    EventAggregator.prototype.subscribe = function (event, handler, obj) {

	if (!obj)
	{
		obj = null;
	}
        return new Subscription(event, handler, obj);

    }

    //publish an event with data.
    //calls all subscribers registered for that event with the data as an argument
    EventAggregator.prototype.publish = function (event, data, objectArr) {

        if (!objectArr)
            objectArr = [];

        //clone the array first so the array is maintained even if events
        //are unsubscribed from during a subscriber
        var subs = _.clone(_eventMap.get(event)) || [];

        var l = objectArr.length;
        if (l == 0) {

            subs.forEach(function (sub) {

                //shouldn't happen but for some reason it is so put this in for now
                if (sub.Handler) {

                    sub.Handler(data);

                }

            });
        }
        else {
            while (l--) {

                var obj = objectArr.shift();

                var ll = subs.length;

                while (ll--) {

                    var sub = subs[ll];

                    if (sub.Object == obj) {
                        //shouldn't happen but for some reason it is so put this in for now
                        if (sub.Handler) {

                            sub.Handler(data);

                        }

                        subs.remove(sub);
                    }

                }

            }
        }

        //asynch
        //var callHandler = handler => handler(data);
        //subs.forEach( sub => _.defer(callHandler, sub.Handler) );

    }

    //unsubscribe all subscriptions linked to an object
    EventAggregator.prototype.unsubscribeObject = function (obj) {

        var subs = _objectMap.get(obj) || [];

        subs.forEach(function (sub) {

            var eventSubscribers = _eventMap.get(sub.Event) || [];
            _.pull(eventSubscribers, sub);

            sub.Object = null;
            sub.Event = null;
            sub.Handler = null;

        });

        _objectMap.delete(obj);

    }

    //unsubsribe all subscriptions linked to an event
    EventAggregator.prototype.unsubscribeEvent = function (event) {

        var subs = _eventMap.get(event) || [];

        subs.forEach(function (sub) {

            var objectSubscribers = _eventMap.get(sub.Object) || [];
            _.pull(objectSubscribers, sub);

            sub.Object = null;
            sub.Event = null;

        });

        _eventMap.delete(event);

    }

    EventAggregator.prototype.unsubscribeAll = function () {

        _eventMap = new Map();
        _objectMap = new WeakMap();

    }

    return new EventAggregator();

}).call({});


module.exports = ev;