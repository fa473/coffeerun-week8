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

        $('.hidden-achievements').hide();

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

            //trigger modal if size is coffeezilla and caffeine rating is 100 and flavor shot is added
            if (data['size'] == 'coffeezilla' && data['strength'] == 100 && data['flavor'] != '') {
                $('#myModal').modal();
            }

            //submit order
            fn(data);

            //after order submitted, reset options to default and set focus to first box
            this.reset();
            this.elements[0].focus();
            $('.hidden-achievements').hide();

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

    FormHandler.prototype.unlockAchievements = function() {
        $('#yes-achievement').click(function() {
            $('.hidden-achievements').show();
        });
    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
