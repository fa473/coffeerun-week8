QUnit.test('add', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();
    var obj = {
        'james@bond.com': 'eshpresso',
        'm@bond.com': 'tea'
    };
    var obj2 = {
        'm@bond.com': 'tea'
    };

    assert.strictEqual(ds.add('m@bond.com', 'tea'), undefined, 'Added order');
    assert.strictEqual(ds.add('james@bond.com', 'eshpresso'), undefined, 'Added order');
    assert.deepEqual(ds.getAll(), obj);

    assert.strictEqual(ds.remove('james@bond.com'), undefined, 'removed');
    assert.deepEqual(ds.getAll(), obj2);

    assert.strictEqual(ds.get('m@bond.com'), 'tea', 'tea');
    assert.strictEqual(ds.get('james@bond.com'), undefined);

});

QUnit.test('truck', function(assert) {
    (function(window) {
        'use strict';
        var App = window.App;
        var Truck = App.Truck;
        var DataStore = App.DataStore;
        var myTruck = new Truck('ncc-1701', new DataStore());
        window.myTruck = myTruck;
    })(window);
    assert.strictEqual(myTruck.createOrder({
        email: 'me@goldfinger.com',
        coffee: 'double mocha'
    }), undefined);

    assert.strictEqual(myTruck.createOrder({
        email: 'dr@no.com',
        coffee: 'decaf'
    }), undefined);

    assert.strictEqual(myTruck.createOrder({
        email: 'm@bond.com',
        coffee: 'earl grey'
    }), undefined);

    assert.strictEqual(myTruck.createOrder({
        email: 'm@bond.com',
        coffee: 'earl grey'
    }), undefined);
});
