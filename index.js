var evs = require('event-stream'),
    gutil = require('gulp-util'),
    defaults = require('defaults'),
    artTemplate = require("art-template"),
    processDir = require("process").cwd(),
    path = require('path'),
    fs = require("fs"),
    PluginError = gutil.PluginError;

var jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM();
var $ = jQuery = require('jquery')(window);

var pattern = /([<][!][-]{2}).?layout[(]?.?["'](.*)["'].?[)]?.?[-]{2}[>]/g;

function exportData(file) {
    var {document} = (new JSDOM(String(fs.readFileSync(file.path)))).window;
    global.document = document;

    var title = document.title;
    var scripts = $(document).find("head script").prop("outerHTML");

    $(document).find("head title,head script").remove();

    var header = $(document).find("head").html();
    var body = $(document).find("body");
    var bodyContent = body.html();
    var xtemplates = body.find("xtemplate");
    $.each(xtemplates, function (idx, template) {
        var temp = $(template);
        var layout = path.join(path.dirname(file.path),temp.attr("src"));
        var layoutDatas = {};

        $.each(template.attributes,function(index, element) {
            var name = element.name;
            var value = element.value;
            if ("src" != name) {
                layoutDatas[name] = temp.attr(name);
            }
        });
        layoutDatas["body"] = temp.html();
        var oldContent = temp.prop("outerHTML");
        var content = artTemplate(layout, layoutDatas);
        bodyContent = bodyContent.replace(oldContent, content);
    });
    return {
        title: title, header: header, body: bodyContent, scripts: scripts
    };
}

function getTemplateLayout(file) {
    var array = fs.readFileSync(file.path).toString().split("\n");
    var match = pattern.exec(array[0]);
    if (match) {
        return path.join(path.dirname(file.path), match[2]);
    }
    return null;
}

/**
 * @param options 配置文件 查阅artTemplate配置
 * @param defaultDatas 默认数据
 * @returns {*}
 */
function gulpElegantTemplate(options, defaultDatas) {
    options = defaults({
        "root": processDir,
        "tempalte": "./src/layouts/template.html"
    }, options);

    artTemplate.defaults.escape = false;
    artTemplate.defaults.root = options.root;

    function process(file) {
        if (file.isStream()) {
            this.emit('error', new PluginError("gulp-x-template", 'Streams aren\'t supported'));
        }

        if (file.isBuffer()) {
            var data = exportData(file);
            var templateFile = getTemplateLayout(file) || options.tempalte;
            var content = artTemplate(templateFile, defaults(data, defaultDatas));
            file.contents = new Buffer(content);
        }
        this.emit('data', file);
    }

    return evs.through(process);
}

module.exports = gulpElegantTemplate;