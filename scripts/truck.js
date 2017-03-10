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
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    //added function to return the orders list instead of just printing to console
    Truck.prototype.returnOrders = function() {
        return this.db.data;
    };

    App.Truck = Truck;
    window.App = App;

})(window);
