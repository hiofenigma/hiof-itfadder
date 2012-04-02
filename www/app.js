

Ext.application({
	glossOnIcon: false,
    name: 'IT-fadder',
	phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
   
    requires: [
        'Ext.Map',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.plugin.google.Traffic',
        'Ext.plugin.google.Tracker',
		'Ext.data.Store',
        'Ext.List',
        'Ext.plugin.PullRefresh'
    ],

    launch: function() {
		
		//Serves as an interface against buddies.json
		//All buddies must be stored in buddies.json with a first name, 
		//last name, email, phone number and picture file name (captain_placeholder.jpg).
		//A file with that same name must exist in poth img/buddies_82 and img/buddies_320 
		//with the resolution 82x82 pixels and 320x320 pixels respectively.
		var store = Ext.create('Ext.data.Store', {
            fields: ['firstName', 'lastName', 'phone', 'email', 'imageName'],

            //filter the data using the firstName field
            sorters: 'firstName',
            autoLoad: true,

            //setup the grouping functionality to group by the first letter of the firstName field
            grouper: {
                groupFn: function(record) {
                    return record.get('firstName')[0];
                }
            },

            //setup the proxy for the store to use an ajax proxy and give it a url to load
            //the local contacts.json file
            proxy: {
                type: 'ajax',
                url: 'buddies.json'
            }
        });
	
	
        // The following is accomplished with the Google Map API
        var position = new google.maps.LatLng(59.129454,11.352868),  //Remmen, Halden, Norway

            infowindow = new google.maps.InfoWindow({
                content: ""
            }),

            //Tracking Marker Image
            image = new google.maps.MarkerImage(
                './img/point.png',
                new google.maps.Size(32, 31),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 31)
            ),

            shadow = new google.maps.MarkerImage(
                './img/shadow.png',
                new google.maps.Size(64, 52),
                new google.maps.Point(0, 0),
                new google.maps.Point(-5, 42)
            );
		
		// For statiske skjermer uten noen funksjon kan iframe og en vanlig HTML-side brukes 
		// (forenkler, og gjør app.js mer oversiktlig). 
		var homeScreen = {
                    title: 'Hjem',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<iframe style="position:absolute;left: 0px;width: 100%;top: 0px;height: 100%;" src="./hjem.html" />'
                    ].join("")
                };
				
		// For statiske skjermer uten noen funksjon kan iframe og en vanlig HTML-side brukes 
		// (forenkler, og gjør app.js mer oversiktlig). 
		var eventScreen = {
				title: 'Program',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<iframe style="position:absolute;left: 0px;width: 100%;top: 0px;height: 100%;" src="./program.html" />'
                    ].join("")
				};
				
		var buddyScreen = Ext.create('Ext.List', {
				title: 'Faddere',
                iconCls: 'home',
				store: store,
				grouped: true,
				itemTpl: 
				[ 
					'<div class="contact2">',
					'<table><tr><td ROWSPAN=2>',
						'<img style="margin-right: 8px;" src="img/buddy_82/{imageName}" />',
						'</td><td></td>',
					'<tr><td></td><td>',
						'{firstName} {lastName}',
					'</tr></table></div>'
				],
				disclosure: true,
				onItemDisclosure: function(record, item, index, e) {
					//show a messagebox alert which shows the persons firstName
					e.stopEvent();
					Ext.Msg.alert(record.get('firstName') + ' ' + record.get('lastName'), record.get('firstName') + ' kan nås på telefon ' + record.get('phone') + ' eller epost' + record.get('email'));
				}
			   });
				
		var mapScreen = Ext.create('Ext.Map', {
			
			
			title: 'Kart',
			iconCls: 'home',
			cls: 'home',
			scrollable: true,
			
			mapOptions : {
                center : position, 
                zoom : 14,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.google.Tracker({
                    trackSuspended: true,   //suspend tracking initially
                    allowHighAccuracy: true,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'Du er her',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.google.Traffic()
            ],

            listeners: {
                maprender: function(comp, map) {
                    var directionsDisplay = new google.maps.DirectionsRenderer();
					var directionsService = new google.maps.DirectionsService();
					directionsDisplay.setMap(map);
					
					var remmen = new google.maps.Marker({
                        position: new google.maps.LatLng(59.129102,11.352654),
                        title : 'Remmen',
                        map: map
                    });
					var stadion = new google.maps.Marker({
						position: new google.maps.LatLng(59.122655,11.376193),
						title: 'Stadion studentboliger',
						map: map
					});
					
					var kongens = new google.maps.Marker({
						position: new google.maps.LatLng(59.11869,11.388488),
						title: 'Kongens',
						map: map
					});
					

                    google.maps.event.addListener(remmen, 'click', function() {
                        infowindow.setContent("Høgskolen i Østfold");
						infowindow.open(map, remmen);
                    });					
					google.maps.event.addListener(remmen, 'dblclick', function() {
						calcRoute(position, remmen.position, map)  
                    });
					
					google.maps.event.addListener(stadion, 'click', function() {
                        infowindow.setContent("Stadion studentboliger");
						infowindow.open(map, stadion);
                    });					
					google.maps.event.addListener(stadion, 'dblclick', function() {
                        calcRoute(position, stadion.position, map)   
                    });
					
					google.maps.event.addListener(kongens, 'click', function() {
                        infowindow.setContent("Kongens");
						infowindow.open(map, kongens);
                    });					
					google.maps.event.addListener(kongens, 'dblclick', function() {
                        calcRoute(position, kongens.position, map)
                    });
                }

            }
        });
		
		//The whole app UI lives in this tab panel
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [homeScreen, eventScreen, mapScreen, buddyScreen]
        });
    },
	
	
});

 function calcRoute() {
		
		console.log(arguments[0].toString());
		console.log(arguments[1].toString());
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		directionsDisplay.setMap(arguments[2]);
		
		var request = {
			origin:arguments[0], 
			destination:arguments[1],
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
			
			directionsDisplay.setDirections(response);
			}else{
			console.log('something went wrong in getting directions');
		  }
		});
	}