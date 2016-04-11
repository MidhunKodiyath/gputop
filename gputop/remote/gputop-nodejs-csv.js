const http = require('http');
var gputop;
var supported_oa_query_guids;

function GPUTopNodeJSUI()
{
    this.type = "dummy_ui";
}

GPUTopNodeJSUI.prototype.syslog = function(message)
{
    console.log(message);
}

GPUTopNodeJSUI.prototype.show_alert = function(message, type)
{
    console.log(message);
}

GPUTopNodeJSUI.prototype.weblog = function(message)
{
    console.log(message);
}

GPUTopNodeJSUI.prototype.update_features = function(features)
{
    console.log(features);
    gputop.open_oa_metric_set({guid: features.supported_oa_query_guids[0]});
    supported_oa_query_guids = features.supported_oa_query_guids;
    /*features.supported_oa_query_guids.forEach(function (guid, i, a) {
        gputop.open_oa_metric_set({guid:guid});
    });*/
}

GPUTopNodeJSUI.prototype.queue_redraw = function()
{
    if (supported_oa_query_guids !== undefined)
    {
        console.log("\n\n\n\nRedraw\n\n\n\n");
        var metric = gputop.get_map_metric(supported_oa_query_guids[0]);
        console.log(metric);
    }
}

GPUTopNodeJSUI.prototype.load_metrics_panel = function(open_query)
{
    open_query();
}

GPUTopNodeJSUI.prototype.update_slider_period = function(period)
{
}

GPUTopNodeJSUI.prototype.render_bars = function()
{
}

GPUTopNodeJSUI.prototype.log = function(level, message)
{
    console.log(level);
    console.log(message);
}

var gputop_ui = new GPUTopNodeJSUI();

function gputop_ready(gputop_inst)
{
    gputop = gputop_inst;
    gputop.connect();
}

function gputop_is_demo () {
    return false;
}

function on_gputop_web_ready(gputop_web) {
    http.get("http://localhost:7890/gputop.js", function(response) {
        var gputopjs = "";
        response.setEncoding('utf8');
        response.on('data', function(data) {
            gputopjs += data;
        });
        response.on('end', function () {
            eval(gputop_web);
            eval(gputopjs);
        });
    });
}

http.get("http://localhost:7890/gputop-web.js", function(response) {
    var gputop_web = "";
    response.setEncoding('utf8');
    response.on('data', function(data) {
        gputop_web += data;
    });
    response.on('end', function () {
        on_gputop_web_ready(gputop_web);
    });
});
