var SceneViewModel = function () {

    var self = this;

    self.Scene = CT.dataStore.babylonData;

    CT.controllers.AddToScene.initializeScene();

    self.SceneLiveAction = CT.dataStore.sceneLiveActionData;
    function isMouseOverComponentHandler(value) {
        if (value) {
            $('#SceneView').css("cursor", "pointer");
            $('#SceneView').on(
                {
                    'keydown': function (e) {
                        switch (e.which) {
                            case 13:
                                var actionData = CT.dataStore.sceneLiveActionData();
                                var x = actionData.MousePositionX();
                                var y = actionData.MousePositionY();
                                var z = actionData.MousePositionZ();
                                CT.controllers.AddToScene.connectSelectedComponent(x, y, z);
                                break;
                        }
                    }
                }
            );
        }
        else {
            $('#SceneView').css("cursor", "auto");
            $('#SceneView').off("keydown");
        }
    }
    self.SceneLiveAction().IsMouseOverComponent.subscribe(isMouseOverComponentHandler);

    return self;


}

module.exports = SceneViewModel;