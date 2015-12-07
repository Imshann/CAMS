/**
 * 模板模块
 * @author Shann
 */
define(function(require, exports, module) {
    
    function fetchEditModal(data) {
        var tpl = require("../templates/edit-modal.html");
        return Handlebars.compile(tpl)(name, data);
    }

    return {
        fetchEditModal: fetchEditModal
    }
});