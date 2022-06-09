var refTagger = {
  settings: {
    bibleVersion: "RVR60",
    convertHyperlinks: false,
    roundCorners: true,
    socialSharing: [],
    customStyle: {
      heading: {
        backgroundColor: "#078b8f",
        color: "#ffffff"
      },
      body: {
        color: "#000000"
      }
    }
  }
};
(function (d, t) {
  var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
  g.src = "//api.reftagger.com/v2/RefTagger.es.js";
  s.parentNode.insertBefore(g, s);
}(document, "script"));