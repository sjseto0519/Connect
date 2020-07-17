
var ViewController = (
    function (CT) {

        var self = {};
        self.CallbackCount = 1;

        function addSubview(name, subviewName) {
            var subview = CT.views[name].subViews[subviewName]();
            subview.attr("id", name+"-"+subviewName+"Id");
            var parentId = subview.data("parentId");
            var container = $('#' + parentId);
            container.append(subview);
            var vm = ko.dataFor(container[0]);
            ko.applyBindingsToDescendants(vm, subview[0]);
        }

        function removeSubview(name, subviewName) {
            var subview = $("#" + name + "-" + subviewName + "Id");
            ko.cleanNode(subview[0]);
            subview.remove();
        }

        function setupView(name, parent) {

            var viewcontainer = CT.viewModelStore[name].View();
            if (!viewcontainer) {
                console.log("View not defined: " + name);
                return;
            }
            CT.views[name] = viewcontainer;
            view = viewcontainer.mainView();
            if (!view) {
                console.log("View not defined: " + name);
                return;
            }
            view.attr("data-bind", "with:$data."+name+"()");
            var container = $('#' + name+'View');
            container.append(view);
            var vm = CT.viewModelStore[name].ViewModel();
            ko.applyBindingsToDescendants(vm, container[0]);
            container.find(".colorPicker").each(function () {
                $(this).colorpicker();
            });
            container.find(".slider").each(function () {
                $(this).trigger("change");
            });

        }

        function setupInitialViews() {

            setupView("Menu", "Menu");
            setupView("SceneControls", "Controls");
            setupView("Scene", "Scene");
        }

        function setupMouseEvents() {
            $('#renderCanvas').on(
                {
                    'mouseover': function () {
                        CT.dataStore.sceneLiveActionData().IsOverScene(true);
                    },
                    'mouseout': function () {
                        CT.dataStore.sceneLiveActionData().IsOverScene(false);
                    }
                }
            );
        }

        function initialize() {
            setupInitialViews();
            setupMouseEvents();
            CT.controllers.Scene.hideLoadingScreen();
        }

        
        self["initialize"] = initialize;
        self["setupInitialViews"] = setupInitialViews;
        //self["setupComponents"] = setupComponents;
        self["setupMouseEvents"] = setupMouseEvents;
        self["addSubview"] = addSubview;
        self["removeSubview"] = removeSubview;

        return self;

    }
).call({}, CT);

module.exports = ViewController;