CT._obj = function (obj) {

    var self = this;
    self.foundNodes = [];

    function findNodesByName(name, self) {
        for (var prop in this) {
            var propname = prop.slice(0, 1);
            if (propname !== "_") {
                if (prop === name) {
                    self.foundNodes.push(this[prop]);
                    return;
                }
                else {
                    findNodesByName.call(this[prop], name, self);
                }
            }
        }
    }

    var returnObj = {
        'customStringify': function () {
            var ss = "{ ";
            for (var prop in obj) {
                ss += "" + prop + ":";
                var val = obj[prop];
                if ((typeof val) === 'string') {
                    if (val.indexOf("$") === 0) {
                        ss += val;
                    }
                    else {
                        ss += "'" + val + "'";
                    }
                }
                else {
                    ss += JSON.stringify(val);
                }
                ss += ",";
            }
            ss = ss.slice(0, -1);
            ss += "}";
            return ss;
        },
        'removeWhere': function (propname, value) {
            var arr = obj();
            var toRemove = [];
            var i = 0;
            while (i++ < arr.length) {
                var item = arr[i - 1];
                if (item[propname] === value) {
                    toRemove.push(item);
                }
            }
            i = 0;
            while (i++ < toRemove.length) {
                obj.remove(toRemove[i - 1]);
            }
        },
        'getFirstProperty': function () {
            for (var prop in obj) {
                return prop;
            }
            return undefined;
        },
        'toArrayOfObservableProperties': function (ignoreUnderscore) {
            var arr = [];
            if (collection) {
                for (var prop in obj) {
                    if (ignoreUnderscore) {
                        if (prop.lastIndexOf("_", 0) === 0)
                            continue;
                    }
                    var length = obj[prop]().length;
                    var i = 0;
                    while (i++ < length) {
                        arr.push(obj[prop]()[i - 1]);
                    }
                }
            }
            return arr;
        },
        'findNodesByName': function (name) {
            findNodesByName.call(obj, name, self);
            return self.foundNodes;
        },
        'sortKeys': function () {
            var o = obj;
            var sorted = {};
            var key;
            var a = [];

            for (key in o) {
                if (o.hasOwnProperty(key)) {
                    a.push(key);
                }
            }

            a.sort();

            for (key = 0; key < a.length; key++) {
                sorted[a[key]] = o[a[key]];
            }
            return sorted;
        },
        'isUndefinedOrEmpty': function () {
            if (obj) {
                if (ko.isObservable(obj)) {
                    return CT._obj(obj()).isUndefinedOrEmpty();
                }
                return Object.keys(obj).length === 0
            }
            else {
                return true;
            }
        }
    };
    return returnObj;
}
