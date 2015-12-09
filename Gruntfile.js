module.exports = function(grunt) {

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'sea-modules/bootstrap/3.3.5/css/bootstrap.min.css',
                    'sea-modules/bootstrap/3.3.5/css/bootstrap-theme.min.css',
                    'sea-modules/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                    'sea-modules/jquery-ui/1.11.4/jquery-ui.min.css',
                    'src/**/*.css'
                ],
                dest: "css/cams.css"
            },
            js: {
                src: [
                    'sea-modules/jquery/1.11.1/jquery.min.js',
                    'sea-modules/jquery-ui/1.11.4/jquery-ui.min.js',
                    'sea-modules/bootstrap/3.3.5/js/bootstrap.min.js',
                    'sea-modules/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                    'sea-modules/seajs/3.0.0/sea.js',
                    'sea-modules/seajs/3.0.0/seajs-preload.js',
                    'sea-modules/seajs/3.0.0/seajs-text.js',
                    'sea-modules/handlebars/4.0.4/handlebars.js',
                    'sea-modules/underscore/1.8.2/underscore.js',
                    'src/js/main.js'
                ],
                dest: "js/cams.js"
            }
        },
        cssmin: {
            options: {
                banner: "123"
            },
            target: {
                files: {
                    'css/cams.min.css': ['css/cams.css']
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'js/cams.min.js': ['js/cams.js']
                }
            }
        }
    });

    // 加载插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);

};