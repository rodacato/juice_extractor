var page = require('webpage').create(),
    system = require('system'),
    url = system.args[1],
    filename = system.args[2];

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
