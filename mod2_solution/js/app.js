(function () {
'use strict';

//app
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// injection
ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

// controllers
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getItems();

  toBuyCtrl.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;
  boughtCtrl.items = ShoppingListCheckOffService.getItemsBought();
}

// service
function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
    {name : "cookies"       , quantity : 2},
    {name : "sugary drinks" , quantity : 4},
    {name : "snacks"        , quantity : 10},
    {name : "chocolates"    , quantity : 20},
    {name : "pepto bismol"  , quantity : 5}
  ];

  var itemsBought = [];

  service.getItems = function() {
    return itemsToBuy;
  }

  service.buyItem = function(index) {
    var itemBought = itemsToBuy.splice(index, 1);
    itemsBought.push(itemBought[0]);
  }

  service.getItemsBought = function() {
    return itemsBought;
  }
}

})();
