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

    // update strengthOutput when slider changes and add color
    var slider = document.getElementById('strengthLevel');
    var sliderOutput = document.getElementById('strengthOutput');
    //var sliderLabel = document.getElementById('strengthLabel');
    var sliderLabel1 = document.getElementById('strengthtext');

    // set initial color
    sliderOutput.style.color = 'green';


    slider.addEventListener('input', function() {
        sliderOutput.textContent = slider.value;
        sliderOutput.value = slider.value;
        // change the color of the label and number based on intensity
        var intensityColor;
        if (slider.value < 30) {
            intensityColor = 'green';
            sliderLabel1.textContent = 'Normal Caffeine level';
        } else if (slider.value < 60) {
            intensityColor = '#FFFF00';
            sliderLabel1.textContent = 'Medium Caffeine level';
        } else {
            intensityColor = 'red';
            sliderLabel1.textContent = 'High Caffeine level';
        }

        sliderOutput.style.color = intensityColor;
        //sliderLabel.style.color = intensityColor;
        sliderLabel1.style.color = intensityColor;
    });

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
            if (data.size == 'coffeezilla' && data.strength >= 66) {
                $('#myModal').modal('show');
            }
        });
    };
    FormHandler.prototype.addPowerUpOptions = function(checkBoxSelector) {
        console.log('Adding power up options in form');
        this.$formElement.on('click', function() {
            this.$powerUpOptions = $(checkBoxSelector);
            this.$powerUpOptions.removeClass('hide');
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
