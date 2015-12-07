/**
 * 布局模块
 * @author Shann
 */
define(function(require, exports, module) {
    
    var B = require('app/behavior');
    
    renderLectureList();
    renderLessons();
    /**
     * 头部
     * @author Shann
     */
    //  function renderHeader() {
    //      var tpl = require("../templates/header.html");
    //      $('body').append(tpl);
    //      B.bindHeaderEvent();
    //  }

    /**
     * 讲师列表
     * @author Shann
     */
    function renderLectureList() {
        var tpl = require("../templates/lecturer-list.html"),
            data = require('http://127.0.0.1:8020/CAMS/data/lecturer.json'),
            html = Handlebars.compile(tpl)(data);
        $('#gantt-chart').append(html);
    }
    
    /**
     * 课程列表
     * @author Shann
     */
    function renderLessons() {
        var tpl = require("../templates/lesson.html")
            data = {},
            data = require('http://127.0.0.1:8020/CAMS/data/lesson.json'),
            data['calendar']=B.calendar,
            html = Handlebars.compile(tpl)(data);
        $('#gantt-chart').append(html);
        $('.ganttview-grid, .ganttview-blocks').width(B.slideContainerWidth);
        $('.ganttview-slide-container').height($('.ganttview-vtheader').height()+42+20);
        renderCalendar();
        B.init();
    }
    
    /**
     * 日历列表
     */
    function renderCalendar(){
        var tpl = require("../templates/calendar.html"),
            data = B.calendar,
            html = Handlebars.compile(tpl)(data);
        $('#calendar').width(B.slideContainerWidth).append(html);
    }

    /**
     * 编辑框
     * @author Shann
     */
    //  function renderEditbox() {
    //      var tpl = require("../templates/editbox.html"),
    //          data = require('http://127.0.0.1:8020/CAMS/data/lecturer.json'),
    //          html = Handlebars.compile(tpl)(data);
    //      return html;
    //  }

    /**
     * 行块
     * @author Shann
     */
    //  function renderBlock() {
    //      var tpl = require("../templates/block.html"),
    //          html = Handlebars.compile(tpl)();
    //      return html;
    //  }

        //  renderHeader();

    //      renderLessons();
    //      renderEditbox();
    //    
    //      return {
    //          renderLessons: renderLessons,
    //          renderEditbox: renderEditbox,
    //          renderBlock: renderBlock
    //      }
    
    
});