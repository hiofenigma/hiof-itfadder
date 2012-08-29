Ext.define('ITFadder.view.Studentmap', {
	extend: 'Ext.Panel',
    xtype: 'studentmapcard',
	config: {
        iconCls: 'maps',
        layout: 'card',
		title: 'Kart',
		items: [
		{
			docked: "top",
			xtype: "toolbar",
			ui: "light",
			layout: {
				pack: "center"
			},
			items: [{
				iconCls: "locate",
				iconMask: true,
				handler: function() {
					var geolocate = map.getControlsBy("id", "locate-control")[0];
					if (geolocate.active) {
						geolocate.getCurrentLocation();
					} else {
						geolocate.activate();
					}
				}
			}, {
				xtype: "spacer"
			}, {
				iconMask: true,
				iconCls: "add",
				handler: function() {
					map.zoomIn();
				}
			}, {
				iconMask: true,
				iconCls: "minus",
				handler: function() {
					map.zoomOut();
				}
			}]
		},
		{
				xtype: "component",
				scrollable: false,
				monitorResize: true,
				id: "map",
				listeners: {
					painted: function() {
						var self = this;
						init(function(feature) {
							Ext.Msg.defaultAllowedConfig.zIndex = 10000;
							Ext.Viewport.add(
								Ext.Msg.alert("Hurr", "Hurr durr", Ext.emptyFn)
							);
						})
					},
					resize: function() {
						if (window.map) {
							map.updateSize();
						}
					}
				}
			},
		
        ]
    }
});