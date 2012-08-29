Ext.define('ITFadder.store.Buddies', {
	extend: 'Ext.data.Store',
	
	config: {
		model: 'ITFadder.model.Buddy',
		data: [
			{ firstName: 'Dave', lastName: 'Developer', phone: '12345678', email: 'dave@buddy.com', imageName: 'william_killerud.jpg' },
			{ firstName: 'Sally', lastName: 'Sysadmin', phone: '12345678', email: 'sally@buddy.com', imageName: 'william_killerud.jpg'},
			{ firstName: 'Craig', lastName: 'CGI', phone: '12345678', email: 'craig@buddy.com', imageName: 'william_killerud.jpg'}
		]
	}
});