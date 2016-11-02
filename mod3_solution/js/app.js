(function(){
  'use restrict';

  //app
  angular.module('NarrowItDownApp', [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com/");

  function FoundItemsDirective(){
    var ddo = {
      restrict: 'E',
      templateUrl: 'loader/itemsloaderindicator.template.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
    list.isEmpty = function() {
      return list.foundItems && list.foundItems.length == 0;
    }

    list.isNotEmpty = function() {
      return !list.isEmpty;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController( MenuSearchService){
    var list = this;
    var service = MenuSearchService;

    list.getMatchedMenuItems = function(searchTerm) {
        if(searchTerm === undefined || searchTerm == "") {
          list.found = [];
        } else {
          service.getMatchedMenuItems(searchTerm)
            .then(function(foundItems){
              list.found = foundItems;
            });
        }
    };

    list.removeItem = function(index) {
      service.removeItem(index);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var menu = this;
    var foundItems = [];

    menu.removeItem = function(index){
        foundItems.splice(index, 1);
    };

    menu.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        var fullList = result.data.menu_items;
        // process result and only keep items that match
        foundItems = [];
        for (var index in fullList) {
          var item = fullList[index]
          if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
            foundItems.push(item);
          }
        }
        // return processed items
        return foundItems;
      });
    };
  }
})();
