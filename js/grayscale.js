/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

var Place_Details = {

  init: function (map_obj, place_id) {
    var _this = this;

    this.getAll(map_obj, place_id, function(details) {
      _this.ui.show(details.reviews);
    });
  },

  getAll: function (map_obj, place_id, callback) {
    var service = new google.maps.places.PlacesService(map_obj);
    
    service.getDetails({
      placeId: place_id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if(callback)
          callback(place);
      }
    });
  },

  ui: {
    show: function (reviews) {

        var $container = $('#google_reviews');

        reviews.forEach(function (review, index) {

          if (review.rating > 4) {
            displayReview(review);
          }

          function displayReview (review) {

            var $content = $('<div/>', {
              style: 'margin: 100px 0;'
            });

            var $name = $('<h3/>', {
              id: 'name-' + index,
              html: review.author_name,
              style: 'margin: 1em;'
            });

            var $review = $('<blockquote/>', {
              id: 'review-' + index,
              html: review.text
            });

            var $stars = $('<div/>', {
              class: 'rateit',
              'data-rateit-value': review.rating,
              'data-rateit-ispreset': true,
              'data-rateit-readonly': true
            }).rateit();

            $content.append($review, $stars, $name).appendTo($container);
          }

        });
    }
  }
};

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(49.326592,-123.072545),

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(49.326592,-123.072545);
    var storeMarker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });

    google.maps.event.addListener(map, 'click', function() {
        window.open("https://www.google.com/maps/dir/Current+Location/1915+Lonsdale+Ave,+North+Vancouver,+BC+V7M+2K3");
    });

    var PLACE_ID = 'ChIJxRqbsj5whlQRXZBUDUv-2j0';
    var place_details = Object.create(Place_Details);
    place_details.init(map, PLACE_ID);
    
}
