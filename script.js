"use strict";

// Cycles through overlayes
function cycleOverlay(map, mapOverlays)
{
    // Create the first overlay and add to map
    var overlayCount = 1;
    var overlays = [];

    // Changes overlay every 3 seconds
    setInterval(function() {
        map.removeOverlay(overlay);

        for (overlay in overlays)
        {
            map.removeOverlay(overlays[overlay]);
            overlays.splice(overlay,1);
        }

        if (overlayCount > mapOverlays.length)
        {
            overlayCount = 1;
        }

        for (var overlay in mapOverlays[overlayCount - 1])
        {

            var points = [
                getMapPoints(mapOverlays[overlayCount - 1][overlay].coordinates[0]),
                getMapPoints(mapOverlays[overlayCount - 1][overlay].coordinates[1])
            ];

            overlay = createOverlay(mapOverlays[overlayCount - 1][overlay].type, points);

            overlays.push(overlay);
            map.addOverlay(overlay);
        }

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
function createOverlay(type, coordinates)
{
    // Options for the overlay
    // TODO: Set colour for overlay
    var overlayOptions = {
      opacity: 1,
      displayOnMinLevel: 10,
      displayOnMaxLevel: 14,
    }

    var overlay = new BMap.GroundOverlay(new BMap.Bounds(coordinates[0], coordinates[1]), overlayOptions);

    if (type == 0)
    {
        overlay.setImageURL('images/black.png');
    }
    else
    {
        overlay.setImageURL('images/red.png');
    }

    return overlay;
}

var map = createMap(getMapPoints({'lat': -74.023247, 'lng': 40.766421}));

cycleOverlay(map, overlays);
