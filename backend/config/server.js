module.exports = ({ env }) => ({
   host: env('HOST', '0.0.0.0'),
   port: env.int('PORT', 1337),
   admin: {
     auth: {
       secret: env('ADMIN_JWT_SECRET', '7e518921dd33789e7bdc736b7aadd908'),
     },
   },
 });
 