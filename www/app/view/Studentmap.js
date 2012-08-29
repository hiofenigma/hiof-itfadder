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
							var htmlContent = "";
							for (var property in feature.data) {
								if (feature.data[property] != 'undefined') {
									htmlContent = htmlContent + feature.data[property] + "<br>";
								}
							}
							if (self.featurePopup) {
								self.featurePopup.destroy();
							}
							self.featurePopup = new Ext.Panel({
								modal: true,
								centered: true,
								hideOnMaskTap: true,
								width: 240,
								html: htmlContent,
								scrollable: 'vertical'
							});
							self.featurePopup.show();
						})
					},
					resize: function() {
						if (window.map) {
							map.updateSize();
						}
					},
					scope: {
						featurePopup: null
					}
				}
			},
		
        ]
    }
});