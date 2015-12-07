/**
 * 行为模块
 * @author Shann
 */
define(function(require, exports, module) {
    
    // 单元格的宽度
    var _tdW = 99; 
    
    // 滑动范围的总宽度，这里先定义变量
    var _slideContainerWidth = 0;
    
    // 获取日历范围
    var _calendar = getDateRange();
    
    // 实例化模板模块对象
    var V = require('app/template-block');
    
    /**
     * 需要初始化的函数调用
     * @author Shann
     */
    function init(){
        bindResizableUI();
        bindDraggableUI();
        bindPageResizeEvent();
        bindBlockEvent();
    }
    
    /**
     * 给拖动块绑定鼠标双击事件
     * @author Shann
     */
    function bindBlockEvent(){
        var tpl = V.fetchEditModal();
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
    
    /**
     * 让所有带.ui-resizable类的元素有重置大小效果
     * @author Shann
     */
    function bindResizableUI() {
        $('.ui-resizable').resizable({
            maxHeight: 92,
            grid: 100
        });
    }
    
    /**
     * 让所有带.ui-draggable类的元素有拖动效果
     * @author Shann
     */
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
        })
    }
    
    // 对外提供函数接口
    return {
        init: init,
        calendar: _calendar,
        slideContainerWidth: _slideContainerWidth
    }
})