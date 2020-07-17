var EventAggregator = require('./../../Utils/eventaggregator.js');

CT.eventing = EventAggregator;

//var Flatted = require('./../../Utils/flatted.js');

//CT.JSON = Flatted;

window._events = require('./../../Constants/events.js');
CT.events = window._events;

CT.controllers = {};
CT.controllers.Test = require('./../../Renderer/Controllers/TestController.js');
CT.controllers.AddToScene = require('./../../Renderer/Controllers/AddToSceneController.js');
CT.controllers.Scene = require('./../../Renderer/Controllers/SceneController.js');
CT.controllers.View = require('./../../Renderer/Controllers/ViewController.js');


CT.builders = {};
CT.builders.Rod = require('./../../Renderer/Builders/RodBuilder.js');
CT.builders.Connector = require('./../../Renderer/Builders/ConnectorBuilder.js');
CT.builders.Arrow = require('./../../Renderer/Builders/ArrowBuilder.js');

CT.models = {};
CT.models.$ConnectMesh = require('./../../Models/ConnectMesh.js');
CT.models.$ConnectMeshPair = require('./../../Models/ConnectMeshPair.js');
CT.models.$ConnectMeshGroup = require('./../../Models/ConnectMeshGroup.js');
CT.models.$ConnectComponent = require('./../../Models/ConnectComponent.js');

CT.views = {};
