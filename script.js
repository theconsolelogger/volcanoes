"use strict";

var overlays = [
    { 'type': 0, 'coordinates': [
            {'lat': -74.023247, 'lng': 40.766421},
            {'lat': -73.693245, 'lng': 40.786421}
        ]
    },
    { 'type': 1, 'coordinates': [
            {'lat': -74.023247, 'lng': 40.605361},
            {'lat': -73.693245, 'lng': 40.605361}
        ]
    }
];

// Cycles through overlayes
function cycleOverlay(map, mapOverlays)
{
    // Create the first overlay and add to map
    var overlayCount = 1;
    var overlay = '';

    // Changes overlay every 3 seconds
    setInterval(function() {
        map.removeOverlay(overlay);

        var points = [];

        if (overlayCount > mapOverlays.length)
        {
            overlayCount = 1;
        }

        for (var point in mapOverlays[overlayCount - 1].coordinates)
        {
            points.push(getMapPoints(mapOverlays[overlayCount - 1].coordinates[point]));
        }

        overlay = createOverlay(points);

        map.addOverlay(overlay);

        overlayCount += 1;
    }, 5000);
}

// Converts coordinates into BMap.Point
//coordinates array<Float> Array containing latitude and longitude
// Returns BMap.Point
function getMapPoints(coordinates)
{
    return new BMap.Point(coordinates.lat, coordinates.lng);
}

// Creates a map
// locationPoint BMap.Point(lat,lng) The centre point for the map
// Returns a BMap.Map object
function createMap(locationPoint)
{
    var map = new BMap.Map('allmap');

    map.centerAndZoom(locationPoint, 12);
    map.enableScrollWheelZoom();

    return map;
}

// Creates an overlay for the map
// coordinates array<BMap.Point> An array of length 2 containing the south-west and North-East points
// of the overlay
// Returns a BMap.GroundOverlay object
function createOverlay(coordinates)
{
    // Options for the overlay
    // TODO: Set colour for overlay
    var overlayOptions = {
      opacity: 1,
      displayOnMinLevel: 10,
      displayOnMaxLevel: 14,
    }

    var overlay = new BMap.GroundOverlay(new BMap.Bounds(coordinates[0], coordinates[1]), overlayOptions);

    overlay.setImageURL('image.png');

    return overlay;
}

var map = createMap(getMapPoints({'lat': -74.023247, 'lng': 40.766421}));

cycleOverlay(map, overlays);
