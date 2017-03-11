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


    FormHandler.prototype.addSliderHandler = function() {
        var slider = $('#strengthLevel');
        slider.on('input change', function() {
            var rating = slider[0].value;
            if (rating < 30) {
                $('label[for=strengthLevel]').text('Caffeine Rating ' + rating).css('color', 'green');
            } else if (rating >= 30 && rating < 80) {
                $('label[for=strengthLevel]').text('Caffeine Rating ' + rating).css('color', 'yellow');
            } else {
                $('label[for=strengthLevel]').text('Caffeine Rating ' + rating).css('color', 'red');
            }
        });
    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
