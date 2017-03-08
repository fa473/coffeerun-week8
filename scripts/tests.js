QUnit.test('add', function(assert) {
    var ds = new App.DataStore();
    var obj = {
        'james@bond.com': "eshpresso",
        'm@bond.com': "tea"
    };
    var obj2 = { 'm@bond.com': "tea" }

    assert.strictEqual(ds.add('m@bond.com', 'tea'), undefined, 'Added order');
    assert.strictEqual(ds.add('james@bond.com', 'eshpresso'), undefined, 'Added order');
    assert.deepEqual(ds.getAll(), obj);

    assert.strictEqual(ds.remove('james@bond.com'),undefined, 'removed');
    assert.deepEqual(ds.getAll(), obj2);

    assert.strictEqual(ds.get('m@bond.com'), 'tea', 'tea');
    assert.strictEqual(ds.get('james@bond.com'), undefined);

});
