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
    
    // 左侧栏高度
    var vtHeaderHeight = 0;

    /**
     * 需要初始化的函数调用
     * @author Shann
     */
    function init() {
        bindResizableUI();
        bindDraggableUI();
        bindPageResizeEvent();
        bindBlockEvent();
        bindAddWorkEvent();
        onTodayPosition();
        bindAddLessonEvent();
    }
    
    /**
     * 新建课程
     * @author Shann 
     */
    function bindAddLessonEvent(){
        $('#add-lesson').click(function(){
            var itemTpl = V.fetchVtHeaderItem(),
            addLessonModal = V.fetchAddLessonModal();
            $('.unique').remove();
            $('body').append($(addLessonModal).addClass('unique'));
            $('#add-lesson-modal').modal();
            //$('#ganttview-vtheader').prepend(itemTpl);
        })
    }

    /**
     * 定位今天
     * @author Shann
     */
    function onTodayPosition() {
        var t = new Date(),
            str = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate(),
            left = $('[data-today="' + str + '"]').offset().left - 600;
        $('#ganttview-slide-container').scrollLeft(left);
    }

    /**
     * 安排工作
     * @author Shann
     */
    function bindAddWorkEvent() {
        $('#add-work').click(function() {
            var data = require('http://127.0.0.1:8020/CAMS/data/lecturer.json'),
                data1 = _.extend(data, require('http://127.0.0.1:8020/CAMS/data/lesson.json')),
                tpl = V.fetchAddWorkModal(data);
            $('.unique').remove();
            $('body').append($(tpl).addClass('unique'));

            // 时间插件
            $('.datetimepicker').datetimepicker({
                format: 'yyyy-mm-d',
                minView: 2,
                autoclose: true
            });

            // 显示模态框
            $('#add-work-modal').modal().on('hidden.bs.modal', function(e) {
                var workType = $('#select-work-type').val(),
                    lecturer = $('#select-lecturer').val(),
                    startTime = $('#start-time').val(),
                    endTime = $('#end-time').val(),
                classVal = $('#select-class').val(),
                    itemVal = $('#select-item').val(),
                    oneDays = 24 * 3600 * 1000,
                    diffDays = Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / oneDays),
                    dateArr = [],
                    start_range = new Date(startTime);
                for (var i = 0; i <= diffDays; i++) {
                    var item = start_range.getFullYear() + '-' + (start_range.getMonth() + 1) + '-' + start_range.getDate();
                    dateArr.push(item);
                    start_range.setTime(start_range.getTime() + oneDays);
                }

                var item = $('[data-item="' + (classVal + '-' + itemVal) + '"]');

                $.each(dateArr, function(k, v) {
                    var row1 = item.find('[data-today="' + v + '"]').children().eq(0),
                        row2 = item.find('[data-today="' + v + '"]').children().eq(1);
                    row1.html(workType);
                    row2.html(lecturer);
                })
            });
        })
    }

    /**
     * 给拖动块绑定鼠标双击事件
     * @author Shann
     */
    function bindBlockEvent() {
        $('body').on('click', '.editbox', function() {
            var data = require('http://127.0.0.1:8020/CAMS/data/lecturer.json'),
                tpl = V.fetchEditModal(data),
                row1 = $(this).children().eq(0),
                row2 = $(this).children().eq(1);
            $('.unique').remove();
            $('body').append($(tpl).addClass('unique'));
            $('#my-modal').modal();
            $('#my-modal-save').click(function() {
                $('#my-modal').modal('hide');
                var workType = $('#select-work-type').val(),
                    lecturer = $('#select-lecturer').val();
                row1.html(workType);
                row2.html(lecturer);
            })
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
        for (var i = 11; i <= 12; i++) {
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
            var row1 = $('<div>', {
                class: 'row'
            }).html(123);
            var row2 = $('<div>', {
                class: 'row'
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