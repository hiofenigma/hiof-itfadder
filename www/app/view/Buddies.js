Ext.define('ITFadder.view.Buddies', {
    extend: 'Ext.Panel',
    xtype: 'buddiescard',
	requires: [
		'Ext.dataview.List'
	],
    config: {
        iconCls: 'star',
        title: 'Faddere',
		items: [
		{
			xtype: 'titlebar',
			docked: 'top',
			title: '<p>Faddere 2012</p>',
		},
		{
			xtype: 'list',
			store: 'Buddies',
			itemTpl: [ 
				'<div class="contact2">',
				'<table><tr><td ROWSPAN=2>',
					'<img style="margin-right: 8px;" src="img/buddy_82/{imageName}" />',
					'</td><td></td>',
				'<tr><td></td><td>',
					'{firstName} {lastName}',
				'</tr></table></div>'
			],
			listeners: {
				itemtap: function(list, index, item, record) {
						Ext.Msg.alert(record.get('firstName') + ' ' + record.get('lastName'), record.get('firstName') + ' kan nås på telefon ' + record.get('phone') + ' eller epost' + record.get('email'));
				}
			}
		}]
    }
});