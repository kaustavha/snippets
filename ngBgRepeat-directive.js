/*
** An angular directive to allow looping pictures as a background
** To use:
**         > Declare the directive in your DOM, ideally near the top of <body> e.g <div loop-bg></div> 
           > Create an array of bgImgs in your controller e.g $scope.bgImgs = ['./dir/name1', './dir/name2']
*/
app.directive('loopBg', function($timeout, $interval) {
  return {
    template: '<div ng-model="bgImgs"><div ng-repeat="bgImg in bgImgs" class="loop-bg" id="ngBgRepeat_{{$index}}" style="background-image: url({{bgImg}})"></div></div>',
    restrict: 'A',
    link: function postLink($scope, element, attrs) {

      var i = ($scope.bgImgs.length - 1); 
      //images stack, so last img is viewed by user

      (function() {

        $timeout(function() {
          for (var i = $scope.bgImgs.length - 1; i >= 0; i--) {
            if (i != $scope.bgImgs.length - 1) angular.element('#ngBgRepeat_'+i).addClass( "hide" );
          };
        });        

        $interval(function() {  

          var bgA = angular.element('#ngBgRepeat_'+i);  
          (i == 0) ? i = ($scope.bgImgs.length - 1) : i--;             
          var bgB = angular.element('#ngBgRepeat_'+i);

          if (bgA.hasClass( "fade-in" )) bgA.removeClass( "fade-in" );          
          bgA.addClass( "fade-out" ); 
      
          if (bgB.hasClass( "fade-out" )) bgB.removeClass( "fade-out" );          
          if (bgB.hasClass( "hide" )) bgB.removeClass( "hide" );              

          $timeout(function() {            
            bgA.addClass( "hide" );  
            bgB.addClass( "fade-in" );                          
          }, 1500);      


        }, 5000);

      }());

    }
  };
}); 
