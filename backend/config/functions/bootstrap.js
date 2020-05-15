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

	// if (!process.env.PERMISSIONS_SET) {
	// 	const authenticated = await strapi.query('role', 'users-permissions').findOne({ type: 'authenticated' });
	// 	authenticated.permissions.forEach(permission => {
			
	// 		if (permission.type === 'application'){
	// 			if (permission.controller === 'organization' && permission.action === 'delete'){ return; }
	// 			let newPermission = permission;
	// 			newPermission.enabled = true;
	// 			strapi.query('permission', 'users-permissions').update( { id: newPermission.id }, newPermission );
	// 		}

	// 		// ALSO DO FOR UPLOAD
		
	// 	});
	// 	return;
	// 	process.env.PERMISSIONS_SET = true;
	// }
};