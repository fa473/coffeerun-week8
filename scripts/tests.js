var App = window.App;
var ds = new App.DataStore();
var myTruck = new App.Truck('ncc-1701', new App.DataStore());
var obj = {
    'james@bond.com': 'eshpresso',
    'm@bond.com': 'tea'
};
var obj2 = {
    'm@bond.com': 'tea'
};
ds.add('m@bond.com', 'tea');
ds.add('james@bond.com', 'eshpresso');
var orders = {
    'dr@no.com': {
        'coffee': 'decaf',
        'emailAddress': 'dr@no.com'
    },
    'm@bond.com': {
        'coffee': 'earl gray',
        'emailAddress': 'm@bond.com'
    },
    'me@goldfinger.com': {
        'coffee': 'double mocha',
        'emailAddress': 'me@goldfinger.com'
    }
};

var orders2 = {
    'm@bond.com': {
        'coffee': 'earl gray',
        'emailAddress': 'm@bond.com'
    }
};


QUnit.test('getAll', function(assert) {
    assert.deepEqual(ds.getAll(), obj);
});

QUnit.test('getAll2', function(assert) {


    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), obj2);
});


myTruck.createOrder({
    emailAddress: 'me@goldfinger.com',
    coffee: 'double mocha'
});
myTruck.createOrder({
    emailAddress: 'dr@no.com',
    coffee: 'decaf'
});
myTruck.createOrder({
    emailAddress: 'm@bond.com',
    coffee: 'earl gray'
});


QUnit.test('returnorders', function(assert) {

    assert.deepEqual(myTruck.returnOrders(), orders);

});

QUnit.test('returnorders2', function(assert) {
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('me@goldfinger.com');
    //console.log(myTruck.returnOrders());

    assert.deepEqual(myTruck.returnOrders(), orders2);

});
