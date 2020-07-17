using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace Connect
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.3.1.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr.min.js"));

            bool isDebug = false;

#if CONNECTDEBUG
            isDebug = true;
#endif

            if (isDebug)
            {
                var css = new StyleBundle("~/Content/css").Include(
                "~/Content/Dependencies/font-awesome.min.css",
                "~/Content/Dependencies/jquery-ui.min.css",
                "~/Content/Site.css",
                "~/Content/jstree.css",
                  "~/Content/Dependencies/bootstrap.min.css",
                  "~/Content/Dependencies/bootstrap-colorpicker.min.css",
                  "~/Content/bootstrap-overrides.css"
                  );
                css.Orderer = new AsIsBundleOrderer();
                bundles.Add(css);

                var scripts = new ScriptBundle("~/bundles/scripts").Include(
                          "~/Scripts/bundleA-scripts.js",
                  "~/Scripts/jquery-ui.min.js",
                  "~/Scripts/bootstrap.bundle.min.js",
                  "~/Scripts/bootstrap-colorpicker.min.js",
                  "~/Scripts/bundleB-scripts.js",
                          "~/Scripts/jquery.mask.min.js",
                          "~/Scripts/loader.js"
                          );
                scripts.Orderer = new AsIsBundleOrderer();
                bundles.Add(scripts);

                var babylon = new ScriptBundle("~/bundles/babylon").Include(
                          "~/Scripts/Babylon/pep.min.js",
                  "~/Scripts/Babylon/dat.gui.min.js",
                  "~/Scripts/Babylon/cannon.js",
                  "~/Scripts/Babylon/Oimo.js",
                  "~/Scripts/Babylon/gltf_validator.js",
                  "~/Scripts/Babylon/earcut.min.js",
                  "~/Scripts/Babylon/babylon.js",
                  "~/Scripts/Babylon/babylon.inspector.bundle.js",
                  "~/Scripts/Babylon/babylonjs.materials.min.js",
                  "~/Scripts/Babylon/babylonjs.proceduralTextures.min.js",
                  "~/Scripts/Babylon/babylonjs.postProcess.min.js",
                  "~/Scripts/Babylon/babylonjs.loaders.js",
                  "~/Scripts/Babylon/babylonjs.serializers.min.js",
                          "~/Scripts/Babylon/babylon.gui.min.js"
                          );
                babylon.Orderer = new AsIsBundleOrderer();
                bundles.Add(babylon);

            }
            else
            {
                var css = new StyleBundle("~/Content/css").Include(
    "~/Content/Dependencies/font-awesome.min.css",
    "~/Content/Dependencies/jquery-ui.min.css",
    "~/Content/Build/siteCss-*"
          );
                css.Orderer = new AsIsBundleOrderer();
                bundles.Add(css);

                var scripts = new ScriptBundle("~/bundles/scripts").Include(
                          "~/Scripts/Build/Dependencies/Connect/connectDependencies-*",
                  "~/Scripts/jquery-ui.min.js",
                  "~/Scripts/Build/Dependencies/Bundle/bundleDependencies-*",
                          "~/Scripts/jquery.mask.min.js",
                          "~/Scripts/loader.js"
                          );
                scripts.Orderer = new AsIsBundleOrderer();
                bundles.Add(scripts);

                var babylon = new ScriptBundle("~/bundles/babylon").Include(
                          "~/Scripts/Build/Babylon/babylonDependencies-*"
                          );
           
                bundles.Add(babylon);

            }
        }
    }

    class AsIsBundleOrderer : IBundleOrderer
    {
        public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }
}
