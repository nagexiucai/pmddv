function init() {
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    md =
        $(go.Diagram, "v-relation",  // must name or refer to the DIV HTML element
            {
                initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
                contentAlignment: go.Spot.Center,  // align document to the center of the viewport
                layout: $(go.ForceDirectedLayout,  // automatically spread nodes apart
                    {maxIterations: 200, defaultSpringLength: 30, defaultElectricalCharge: 100})
            });
    // define each Node's appearance
    md.nodeTemplate =
        $(go.Node, "Auto",  // the whole node panel
            {locationSpot: go.Spot.Center},
            // define the node's outer shape, which will surround the TextBlock
            $(go.Shape, "Rectangle",
                {fill: $(go.Brush, "Linear", {0: "rgb(254, 201, 0)", 1: "#00bcd4"}), stroke: "white"}),
            $(go.TextBlock,
                {font: "bold 24pt helvetica, bold arial, sans-serif", margin: 4},
                new go.Binding("text", "text"))
        );
    // replace the default Link template in the linkTemplateMap
    md.linkTemplate =
        $(go.Link,  // the whole link panel
            $(go.Shape,  // the link shape
                {stroke: "black"}),
            $(go.Shape,  // the arrowhead
                {toArrow: "standard", stroke: null}),
            $(go.Panel, "Auto",
                $(go.Shape,  // the label background, which becomes transparent around the edges
                    {
                        fill: $(go.Brush, "Radial", {
                            0: "rgb(240, 240, 240)",
                            0.3: "#ffc107",
                            1: "rgba(240, 240, 240, 0)"
                        }),
                        stroke: null
                    }),
                $(go.TextBlock,  // the label text
                    {
                        textAlign: "center",
                        font: "18pt helvetica, arial, sans-serif",
                        stroke: "#0c0c0c",
                        margin: 4
                    },
                    new go.Binding("text", "text"))
            )
        );
    // create the model for the concept map
    var nodeDataArray = [
        {key: 1, text: "wx"},
        {key: 2, text: "os"},
        {key: 3, text: "sys"},
        {key: 4, text: "feiyang"},
        {key: 5, text: "pprint"},
        {key: 6, text: "collections"},
        {key: 7, text: "built-in"},
        {key: 8, text: "wx.aui"},
        {key: 9, text: "wxbasics"},
        {key: 10, text: "treeview"},
        {key: 11, text: "plugins"},
        {key: 12, text: "grids"},
        {key: 13, text: "popups"},
        {key: 14, text: "pubsub"}
    ];
    var linkDataArray = [
        {from: 1, to: 4, text: "3rdlib"},
        {from: 2, to: 7, text: "builtin"},
        {from: 3, to: 7, text: "builtin"},
        {from: 5, to: 4, text: "stdlib"},
        {from: 6, to: 4, text: "stdlib"},
        {from: 8, to: 1, text: "inner"},
        {from: 9, to: 4, text: "customized"},
        {from: 10, to: 4, text: "customized"},
        {from: 11, to: 4, text: "customized"},
        {from: 12, to: 1, text: "inner"},
        {from: 13, to: 4, text: "customized"},
        {from: 14, to: 1, text: "inner"},
        {from: 7, to: 4, text: "stdlib"},
        {from: 2, to: 4, text: "stdlib"},
        {from: 3, to: 4, text: "stdlib"}
    ];
    md.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

anychart.onDocumentReady(function () {
    var data = [
{"x": "wx", "value": 80},
{"x": "os", "value": 65},
{"x": "sys", "value": 40},
{"x": "feiyang", "value": 75},
{"x": "pprint", "value": 15},
{"x": "collections", "value": 10},
{"x": "built-in", "value": 24},
{"x": "wx.aui", "value": 35},
{"x": "wxbasics", "value": 55},
{"x": "treeview", "value": 45},
{"x": "plugins", "value": 60},
{"x": "grids", "value": 40},
{"x": "popups", "value": 25},
{"x": "pubsub", "value": 30}
    ];
    // Creates Tag Cloud chart.
    chart = anychart.tagCloud(data);
    chart.title("Python Module TagCloud");
    chart.container("v-tagcloud");
    chart.draw();
});

init();