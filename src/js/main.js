seajs.config({
    base: "./sea-modules/",
    debug: true
})
   
seajs.use(['app/layout', 'app/behavior']); 

/*function getDateRange(){
    var dateRange = [];
    for(var i=1; i<=12; i++){
        var days=[];
        dateRange.push({
            month: i + '/2015',
            days: 
        });
    }
    
    return dateRange;
}

//console.log( getDateRange() );

var d = new Date(2015, 12, 0);
console.log( d.getDate() );
*/