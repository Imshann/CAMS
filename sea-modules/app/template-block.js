/**
 * 模板模块
 * @author Shann
 */
define(function(require, exports, module) {

    /**
     * 编辑工作
     * @author Shann
     */
    function fetchEditModal(data) {
        var tpl = require("../templates/edit-modal.html");
        return Handlebars.compile(tpl)(data);
    }

    /**
     * 添加工作
     * @author Shann
     */
    function fetchAddWorkModal(data) {
        var tpl = require("../templates/add-work.html");
        return Handlebars.compile(tpl)(data);
    }

    return {
        fetchEditModal: fetchEditModal,
        fetchAddWorkModal: fetchAddWorkModal
    }
});