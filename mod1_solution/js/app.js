(function () {
'use strict';

angular.module('LunchCheckApp', [])
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.list = "";
  $scope.response = "";
  $scope.messageStyle = "";

  $scope.checkIfTooMuch = function () {
    $scope.response = validate($scope);
  };
}

function validate($scope) {
  var list = $scope.list;

  if(list == "" || list == null) {
    $scope.messageStyle = "alert-info";
    return "Please enter data first.";
  }

  var food = list.split(",");
  var numberOfFood = 0;
  for(var i = 0; i < food.length; i++) {
    if(food[i] != "") {
      numberOfFood++;
    }
  }

  if(numberOfFood === 0 ) {
    $scope.messageStyle = "alert-info";
    return "Comma only will not be considered.";
  }

  if(numberOfFood <=3 ) {
    $scope.messageStyle = "alert-success";
    return "Enjoy!";
  }
  $scope.messageStyle = "alert-danger";
  return "Too Much!";
}

})();
