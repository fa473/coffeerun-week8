(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var emailsList = [];

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
            if (data['size'] == 'coffeezilla' && data['strength'] == 100 && data['flavor'] != '' && data['achievement'] == undefined) {
                $('#myModal').modal();
                emailsList.push(data['emailAddress']);
                console.log(emailsList);

                //check if email has unlocked achievements
            } else if (emailsList.includes(data['emailAddress'])) {
                $('.hidden-achievements').show();

            } else {
                //submit order
                fn(data);

                //after order submitted, reset options to default and set focus to first box
                this.reset();
                this.elements[0].focus();
                $('.hidden-achievements').hide();
                $('label[for=strengthLevel]').text('Caffeine Rating').css('color', 'black');
            }
        });
    };

    //adds functionality to the caffeine slider to change colors based on strength
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

    //shows a new powerup field when the "yes" button is checked on the modal
    FormHandler.prototype.unlockAchievements = function() {
        $('#yes-achievement').click(function() {
            $('.hidden-achievements').show();
        });
    };

    //Add functionality to reset button to clear powerups and reset caffeine rating
    FormHandler.prototype.addResetHandler = function() {
        console.log('Setting reset handler for form');
        this.$formElement.on('reset', function() {
            $('.hidden-achievements').hide();
            $('label[for=strengthLevel]').text('Caffeine Rating').css('color', 'black');
        });
    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
