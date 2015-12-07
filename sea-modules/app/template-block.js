/**
 * 模板模块
 * @author Shann
 */
define(function(require, exports, module) {

    function fetchEditbox(data) {
        var tpl = require("../templates/editbox.html");
        return Handlebars.compile(tpl)(name, data);
    }

    return {
        fetchEditbox: fetchEditbox
    }
});