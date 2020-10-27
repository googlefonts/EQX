module.exports = ({ env }) => ({
	email: {
		provider: 'sendmail',
		settings: {
			defaultFrom: 'admin@eqx.com',
			defaultReplyTo: 'admin@eqx.com',
		},
	},
});