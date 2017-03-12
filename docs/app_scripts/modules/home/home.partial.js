(function(module) {
try {
  module = angular.module('templatesCache');
} catch (e) {
  module = angular.module('templatesCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/home/home.partial.html',
    '<span class="cac-main-placeholder"><i class="fa fa-code fa-4x"></i> <i class="fa fa-plus fa-1x"></i> <i class="fa fa-coffee fa-4x"></i></span>');
}]);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2R1bGVzL2hvbWUvaG9tZS5wYXJ0aWFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCd0ZW1wbGF0ZXNDYWNoZScpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndGVtcGxhdGVzQ2FjaGUnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21vZHVsZXMvaG9tZS9ob21lLnBhcnRpYWwuaHRtbCcsXG4gICAgJzxzcGFuIGNsYXNzPVwiY2FjLW1haW4tcGxhY2Vob2xkZXJcIj48aSBjbGFzcz1cImZhIGZhLWNvZGUgZmEtNHhcIj48L2k+IDxpIGNsYXNzPVwiZmEgZmEtcGx1cyBmYS0xeFwiPjwvaT4gPGkgY2xhc3M9XCJmYSBmYS1jb2ZmZWUgZmEtNHhcIj48L2k+PC9zcGFuPicpO1xufV0pO1xufSkoKTtcbiJdLCJmaWxlIjoibW9kdWxlcy9ob21lL2hvbWUucGFydGlhbC5qcyJ9
