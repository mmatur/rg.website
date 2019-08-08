"use strict";

var loadphotoswipejs = 1

$(document).ready(function() {

  let scroll_start = 0;
  let menuClass = 'ml-shrinked-menu'

  $(document).scroll(function() {
    scroll_start = $(this).scrollTop();

    if (scroll_start > 30) {
      $('#rg-navbar').css('box-shadow', '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)');
      $('#rg-navbar').addClass('shrinked-menu');
      $('#rg-navbar').addClass(menuClass);

    } else {
      $('#rg-navbar').css('box-shadow', 'none');
      $('#rg-navbar').removeClass('shrinked-menu');
      $('#rg-navbar').removeClass(menuClass);
    }
  });

  initGallery();
});

function initGallery() {
  /*
	Initialise Photoswipe
	*/
	var items = []; // array of slide objects that will be passed to PhotoSwipe()
	// for every figure element on the page:
	$('figure').each( function() {
		if ($(this).attr('class') == 'no-photoswipe') return true; // ignore any figures where class="no-photoswipe"
		// get properties from child a/img/figcaption elements,
		var $figure = $(this),
			$a 		= $figure.find('a'),
			$img 	= $figure.find('img'),
			$src	= $a.attr('href'),
			$title  = $img.attr('alt'),
			$msrc	= $img.attr('src');
		// if data-size on <a> tag is set, read it and create an item
		if ($a.data('size')) {
			var $size 	= $a.data('size').split('x');
			var item = {
				src		: $src,
				w		: $size[0],
				h 		: $size[1],
				title 	: $title,
				msrc	: $msrc
			};
			console.log("Using pre-defined dimensions for " + $src);
		// if not, set temp default size then load the image to check actual size
		} else {
			var item = {
				src		: $src,
				w		: 800, // temp default size
				h 		: 600, // temp default size
				title 	: $title,
				msrc	: $msrc
			};
			console.log("Using default dimensions for " + $src);
			// load the image to check its dimensions
			// update the item as soon as w and h are known (check every 30ms)
			var img = new Image(); 
			img.src = $src;
			var wait = setInterval(function() {
				var w = img.naturalWidth,
					h = img.naturalHeight;
				if (w && h) {
					clearInterval(wait);
					item.w = w;
					item.h = h;
					console.log("Got actual dimensions for " + img.src);
				}
			}, 30);
	   	}
		// Save the index of this image then add it to the array
		var index = items.length;
		items.push(item);
		// Event handler for click on a figure
		$figure.on('click', function(event) {
			event.preventDefault(); // prevent the normal behaviour i.e. load the <a> hyperlink
			// Get the PSWP element and initialise it with the desired options
			var $pswp = $('.pswp')[0];
			var options = {
				index: index, 
				bgOpacity: 0.8,
				showHideOpacity: true
			}
			new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options).init();
		});	
	});
}

function initMap() {
  var myLatLng = {lat: 46.721077, lng: 5.578430};

  // Styles a map in night mode.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      { elementType: "geometry",
        stylers: [
          { color: "#f5f5f5" }
        ]
      },
      { elementType: "labels.icon",
        stylers: [
          { visibility: "off" }
        ]
      },
      { elementType: "labels.text.fill",
        stylers: [
          { color: "#616161" }
        ]
      },
      { elementType: "labels.text.stroke",
        stylers: [
          { color: "#f5f5f5" }
        ]
      },
      {
        featureType: "administrative.land_parcel", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#bdbdbd" }
        ]
      },
      {
        featureType: "poi", 
        elementType: "geometry",
        stylers: [
          { color: "#eeeeee" }
        ]
      },
      {
        featureType: "poi", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#757575" }
        ]
      },
      {
        featureType: "poi.park", 
        elementType: "geometry",
        stylers: [
          { color: "#e5e5e5" }
        ]
      },
      {
        featureType: "poi.park", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#9e9e9e" }
        ]
      },
      {
        featureType: "road", 
        elementType: "geometry",
        stylers: [
          { color: "#ffffff" }
        ]
      },
      {
        featureType: "road.arterial", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#757575" }
        ]
      },
      {
        featureType: "road.highway", 
        elementType: "geometry",
        stylers: [
          { color: "#dadada" }
        ]
      },
      {
        featureType: "road.highway", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#616161" }
        ]
      },
      {
        featureType: "road.local", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#9e9e9e" }
        ]
      },
      {
        featureType: "transit.line", 
        elementType: "geometry",
        stylers: [
          { color: "#e5e5e5" }
        ]
      },
      {
        featureType: "transit.station", 
        elementType: "geometry",
        stylers: [
          { color: "#eeeeee" }
        ]
      },
      {
        featureType: "water", 
        elementType: "geometry",
        stylers: [
          { color: "#c9c9c9" }
        ]
      },
      {
        featureType: "water", 
        elementType: "labels.text.fill",
        stylers: [
          { color: "#9e9e9e" }
        ]
      }
    ]
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: '/img/marker.png',
    title: ''
  });
}
