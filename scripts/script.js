"use strict";
//Get data and the translate into overlays which needed
function GetData(url,overlays){
 $.get(url, function(data) {
            //console.log(data[0]);
            for (var i = 1; i < data.length; i++) {
                //console.log(data);
                var arr = [];
                for (var j = 0, k = 0; j < data[i].length; j = j + 5, k++) {
                    var overlay = {
                        'type': data[i][j],
                        'coordinates': [{
                                'lat': data[i][j + 1],
                                'lng': data[i][j + 2]
                            },
                            {
                                'lat': data[i][j + 3],
                                'lng': data[i][j + 4]
                            }
                        ]
                    }
                    //console.log(overlay);
                    arr.push(overlay);
                }
                overlays.push(arr);
                //console.log(overlays);
            }
        });
        //console.log(overlays);
}

// Cycles through overlayes
function cycleOverlay(map, mapOverlays) {
    // Create the first overlay and add to map
    var overlayCount = 1;
    var overlays = [];
    var cnt = 0;
    // Changes overlay every 1.5 seconds
    setInterval(function() {
        map.removeOverlay(overlay);
        map.clearOverlays();
        if (cnt == 24)
            cnt = 0;
        createLabel(cnt);
        for (overlay in overlays) {
            map.removeOverlay(overlays[overlay]);
            overlays.splice(overlay, 1);
        }

        if (overlayCount > mapOverlays.length) {
            overlayCount = 1;
        }

        for (var overlay in mapOverlays[overlayCount - 1]) {

            var points = [
                getMapPoints(mapOverlays[overlayCount - 1][overlay].coordinates[0]),
                getMapPoints(mapOverlays[overlayCount - 1][overlay].coordinates[1])
            ];

            overlay = createOverlay(mapOverlays[overlayCount - 1][overlay].type, points);

            overlays.push(overlay);
            map.addOverlay(overlay);
        }

        overlayCount += 1;
        cnt += 1;
    }, 1500);
}

// Converts coordinates into BMap.Point
//coordinates array<Float> Array containing latitude and longitude
// Returns BMap.Point
function getMapPoints(coordinates) {
    return new BMap.Point(coordinates.lat, coordinates.lng);
}

// Creates a map
// locationPoint BMap.Point(lat,lng) The centre point for the map
// Returns a BMap.Map object
function createMap(locationPoint) {
    var map = new BMap.Map('allmap');

    map.centerAndZoom(locationPoint, 13);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    return map;
}

// Creates an overlay for the map
// coordinates array<BMap.Point> An array of length 2 containing the south-west and North-East points
// of the overlay
// Returns a BMap.GroundOverlay object
function createOverlay(type, coordinates) {
    // Options for the overlay
    // TODO: Set colour for overlay
    var overlayOptions = {
        opacity: 0.7,
        displayOnMinLevel: 10,
        displayOnMaxLevel: 20,
    }

    var overlay = new BMap.GroundOverlay(new BMap.Bounds(coordinates[0], coordinates[1]), overlayOptions);

    if (type == 0) {
        overlay.setImageURL('images/volcano.png');
    } else {
        overlay.setImageURL('images/blackhole.png');
    }

    return overlay;
}
//Create Label for mentioning the time when cycling
function createLabel(cnt) {
    var time = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];
    document.getElementById("time").innerHTML = "Time:  " + time[cnt] + "-" + time[cnt + 1];
    //console.log(label);
    /*
     var opts = {
        position: new BMap.Point(-73.903952,40.767077),
        offset: new BMap.Size(30, -30)
    }
    var winSize = $(window).height();
    var label = new BMap.Label("Time:  " + time[cnt] + "-" + time[cnt + 1], opts);
    label.setStyle({
        color: "black",
        fontSize: winSize / 16 + "px",
        height: winSize / 10 + "px",
        lineHeight: winSize / 10 + "px",
        fontFamily: "微软雅黑"
    });
    map.addOverlay(label);
    */
}

var map = createMap(getMapPoints({
    'lat': -73.937297,
    'lng': 40.750026
}));
var url='http://localhost/volcano/NYC.php';
var overlays=[];
GetData(url,overlays);
cycleOverlay(map, overlays);

/*
var points = [new BMap.Point(116.3786889372559,39.90762965106183),
                  new BMap.Point(116.38632786853032,39.90795884517671),
                  new BMap.Point(116.39534009082035,39.907432133833574),
                  new BMap.Point(116.40624058825688,39.90789300648029),
                  new BMap.Point(116.41413701159672,39.90795884517671)
    ];
    //坐标转换完之后的回调函数
    translateCallback = function (data){
      if(data.status === 0) {
        for (var i = 0; i < data.points.length; i++) {
            bm.addOverlay(new BMap.Marker(data.points[i]));
            bm.setCenter(data.points[i]);
        }
      }
    }
    setTimeout(function(){
        var convertor = new BMap.Convertor();
        convertor.translate(points, 1, 5, translateCallback)
    }, 1000);
*/