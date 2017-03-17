(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
        // this.$formElement.on('input', '[name="coffee"]', function(event) {
        //     var coffee = event.target.value;
        //     var strength = $('input[name=strength]');
        //     var message = '';
        //     if (fn(coffee, strength)) {
        //         event.target.setCustomValidity('');
        //     } else {
        //         message = 'strength level is too high for decaf!';
        //         event.target.setCustomValidity(message);
        //     }
        // });
        // this.$formElement.on('input', '[name="strength"]', function(event) {
        //     var strength = event.target.value;
        //     var coffee = $('input[name=coffee]');
        //     var message = '';
        //     if (fn(coffee, strength)) {
        //         event.target.setCustomValidity('');
        //     } else {
        //         message = 'strength level is too high for decaf!';
        //         event.target.setCustomValidity(message);
        //     }
        // });
        // $('input[name=coffee]', 'input[name=strength').on('input', function(event) {
        //     var coffee = $('input[name=coffee]');
        //     var strength = $('input[name=strength]');
        //     var message = '';
        //     if (fn(coffee, strength)) {
        //         event.target.setCustomValidity('');
        //     } else {
        //         message = 'strength level is too high for decaf!';
        //         event.target.setCustomValidity(message);
        //     }
        // });

    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
