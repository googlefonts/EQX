'use strict';

/**
* An asynchronous bootstrap function that runs before
* your application gets started.
*
* This gives you an opportunity to set up your data model,
* run jobs, or perform some special logic.
*
* See more details here: https://strapi.io/documentation/3.0.0-beta.x/configurations/configurations.html#bootstrap
*/

module.exports = async () => {
	// console.log(process.env.PERMISSIONS_SET)
	// if (!process.env.PERMISSIONS_SET) {
		const authenticated = await strapi.query('role', 'users-permissions').findOne({ type: 'authenticated' });
		authenticated.permissions.forEach(permission => {
			
			var newPermission = permission;
			if (permission.type === 'application'){
				if (permission.controller === 'organization' && permission.action === 'delete'){ return; }
				newPermission.enabled = true;
				strapi.query('permission', 'users-permissions').update( { id: newPermission.id }, newPermission );

			} else if (permission.type === 'upload'){
				newPermission.enabled = true;
				strapi.query('permission', 'users-permissions').update( { id: newPermission.id }, newPermission );
				
			} else if (permission.type === 'users-permissions'){
				if (permission.action === 'connect' || permission.action === 'find' || permission.action === 'me' || permission.action === 'init'){ 
					newPermission.enabled = true;
					strapi.query('permission', 'users-permissions').update( { id: newPermission.id }, newPermission );
				}
			}
		});

		// process.env.PERMISSIONS_SET = true;
		// console.log(process.env.PERMISSIONS_SET)
		return;
	// }
};