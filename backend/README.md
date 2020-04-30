# Strapi application

A quick description of your strapi application

## File Upload w/ Google Cloud Storage

By default the EQX CMS will upload images to the public/ folder where it is run, but you may configure it to upload images to Google Cloud Storage.

All that is required is to pass the following environment variables to the application.

GCS_ENABLED='true'
GCS_SERVICE_ACCOUNT_JSON_STRING='{"type":"service_account",....'
GCS_BUCKET_NAME='bucket-name'
GCS_BUCKET_LOCATION='us'

Note: For GCS_SERVICE_ACCOUNT_JSON_STRING, you must JSON.stringify() the original JSON given to you by Google before storing as an env variable.

Please see the [strapi-provider-upload-google-cloud-storage](https://github.com/Lith/strapi-provider-upload-google-cloud-storage/) github repo for more detailed information.



