(function(window) {
    'use strict';
    var App = window.App || {};

    //initializer
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    //all instances of Truck objects will inherit these prototype methods
    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
        return this.db.getAll()
            .then(function(orders) {
                var customerIdArray = Object.keys(orders);
                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(orders[id]);
                    if (printFn) {
                        printFn(orders[id]);
                    }
                }.bind(this));
            }.bind(this));
    };

    //added function to return the orders list instead of just printing to console
    Truck.prototype.returnOrders = function() {
        return this.db.data;
    };

    App.Truck = Truck;
    window.App = App;

})(window);
