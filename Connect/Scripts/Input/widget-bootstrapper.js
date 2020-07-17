var DataStore = require('./../../Renderer/Data/DataStore.js');

CT.dataStore = DataStore;

var ViewModelStore = require('./../../Renderer/Data/ViewModelStore.js');

CT.viewModelStore = ViewModelStore;

var ControlsStore = require('./../../Renderer/Data/ControlsStore.js');

CT.controlsStore = ControlsStore;

CT.utils = {};

var Cache = require('./../../Utils/cache.js');

CT.utils.cache = Cache.initialize();

var DataBind = require('./../../Utils/databind.js');

CT.utils.dataBind = DataBind;

//CT.controllers.View.initialize();
