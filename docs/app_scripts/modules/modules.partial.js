(function(module) {
try {
  module = angular.module('templatesCache');
} catch (e) {
  module = angular.module('templatesCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/modules.partial.html',
    '<div ui-view="content"></div>');
}]);
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtb2R1bGVzL21vZHVsZXMucGFydGlhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgndGVtcGxhdGVzQ2FjaGUnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3RlbXBsYXRlc0NhY2hlJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtb2R1bGVzL21vZHVsZXMucGFydGlhbC5odG1sJyxcbiAgICAnPGRpdiB1aS12aWV3PVwiY29udGVudFwiPjwvZGl2PicpO1xufV0pO1xufSkoKTtcbiJdLCJmaWxlIjoibW9kdWxlcy9tb2R1bGVzLnBhcnRpYWwuanMifQ==
