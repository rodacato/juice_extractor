var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    filename = system.args[2],
    width = 1024,
    height = 768;

page.viewportSize = { width: width, height: height };

if (system.args.length === 2) {
    console.log("Usage: $ phantomjs screenshot.phantom.js <url> <filename>");
}

page.onConsoleMessage = function(msg) {
    return console.log(msg);
};

page.open(url, function (status) {
    if (status === "success") {
        page.render(filename);
        console.log(filename)
    }
    phantom.exit();
});
