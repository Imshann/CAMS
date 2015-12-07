/**
 * 行为模块
 * @author Shann
 */
define(function(require, exports, module) {

    var _tdW = 99;
    var _slideContainerWidth = 0;
    var _calendar = getDateRange();
    var V = require('app/template-block');
    
    function init(){
        bindResizableUI();
        bindDraggableUI();
        bindPageResizeEvent();
//      bindEditEmployeeEvent();
        bindBlockEvent();
    }
    
    /**
     * 给拖动块绑定鼠标双击事件
     * @author Shann
     */
    function bindBlockEvent(){
        var tpl = V.fetchEditbox();
        $('body').on('dblclick', '.ganttview-block', function(){
            $('.unique').remove();
            $('body').append($(tpl).addClass('unique'));
            return false;
        });
    }

    /**
     * 页面重置事件
     */
    function bindPageResizeEvent() {
        $(window).resize(function() {
            _tdW = $('.ganttview-grid-row-cell').width();
            bindResizableUI();
            bindDraggableUI();
        })
    }

    function bindResizableUI() {
        $('.ui-resizable').resizable({
            maxHeight: 92,
            grid: 100
        });
    }

    function bindDraggableUI() {
        $('.ui-draggable').draggable({
            axis: 'x',
            grid: [100, 100]
        });
    }
   

    /**
     * 生成日历数组
     * @author Shann
     */
    function getDateRange() {
        var calendar = [];
        for (var i = 1; i <= 12; i++) {
            calendar.push({
                months: i
            })
        }
        $.each(calendar, function(k, v) {
            var totalDays = new Date(2015, v.months, 0).getDate();
            v['width'] = (totalDays - 1) * (_tdW + 1);
            _slideContainerWidth += v['width'];
            v['days'] = _.range(1, totalDays);
        });
        return calendar;
    }

    /*function bindHeaderEvent() {
        $('#create-lesson-button').click(function() {
            var L = require("app/layout");
            var html = L.renderLessons();
            $('body').append(html);
            bindDeleteButtonEvent();
        });
    }*/

    /*function bindDeleteButtonEvent() {
        $('[data-role="delete-button"]').click(function() {
            alert("I am delete button.");
        });
    }*/
    

    /**
     * 编辑讲师操作
     * @author Shann
     */
    function bindEditEmployeeEvent() {
        
        $('.edit-employee').dblclick(function() {
            
            var row1 = $('<div>',{
                class:'row'
            }).html(123);
            var row2 = $('<div>',{
                class:'row'
            }).html(456);
            var box = $('<div>', {
                class: 'ganttview-block ui-resizable ui-draggable'  
            });
            box.append(row1);
            box.append(row2);
            $(this).append(box);
            bindResizableUI();
            bindDraggableUI();
//          var tpl = require("app/layout").renderEditbox();
//          $('body').append(tpl);
//          var td = $(this),
//              tdTop = td.offset().top,
//              tdLeft = td.offset().left,
//              tdW = td.width(),
//              tdH = td.height(),
//              sw = $('[data-role="select-worktype"]'),
//              sl = $('[data-role="select-lecturer"]');
//
//          $('[data-role="editbox"]').css({
//              top: tdTop,
//              left: tdLeft,
//              width: (tdW + 19),
//              height: (tdH + 19)
//          }).removeAttr('hidden').find('[data-role="close-button"]').click(function() {
//              $('[data-role="editbox"]').remove();
//          });
//          var v1 = '选择工作',
//              v2 = '选择讲师';
//          sw.change(function() {
//              v1 = $(this).val();
//              if (v1 != '选择工作' && v2 != '选择讲师') {
//                  td.html(v1 + '<br/>' + v2);
//                  $('[data-role="editbox"]').remove();
//              }
//          });
//          sl.change(function() {
//              v2 = $(this).val();
//              if (v1 != '选择工作' && v2 != '选择讲师') {
//                  td.html(v1 + '<br/>' + v2);
//                  $('[data-role="editbox"]').remove();
//              }
//          });
        })
    }
   
    /**
     * 选中讲师操作
     * @author Shann
     */
    /*function bindLecturerSelectEvent() {
        $('[data-role="lecturer"]').click(function() {
            var findStr = $.trim($(this).text());
            var highlightColor = $(this).attr('bgcolor');
            $('[data-role="edit-employee"]').each(function() {
                var tdText = $(this).text();
                if (tdText.indexOf(findStr) != -1) {
                    $(this).css({
                        background: highlightColor,
                        color: '#fff'
                    });
                }
            })
        })
    }*/

    /**
     * 重置操作
     * @author Shann
     */
    /*function bindResetButtonEvent() {
        $('[data-role="reset-button"]').click(function() {
            var addEmployee = $(this).parent().siblings('[data-role="edit-employee"]');
            addEmployee.css('background', 'none').empty();
        });
    }*/

    return {
        init: init,
        calendar: _calendar,
        slideContainerWidth: _slideContainerWidth
            //      bindHeaderEvent: bindHeaderEvent,
            //      bindResetButtonEvent: bindResetButtonEvent,
            //      bindLecturerSelectEvent: bindLecturerSelectEvent,
            //      bindEditEmployeeEvent: bindEditEmployeeEvent,
            //      bindDragEmployeeEvent: bindDragEmployeeEvent
    }
})