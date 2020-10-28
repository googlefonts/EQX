module.exports = ({ env }) => ({
   admin: {
      auth: {
         secret: env('ADMIN_JWT_SECRET'),
      },
   },
});
