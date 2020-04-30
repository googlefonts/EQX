if (process.env.GCS_ENABLED === 'true') {
  module.exports = {
    provider: "google-cloud-storage",
    providerOptions: {
      serviceAccount: process.env.GCS_SERVICE_ACCOUNT_JSON_STRING,
      bucketName: process.env.GCS_BUCKET_NAME,
      bucketLocation: process.env.GCS_BUCKET_LOCATION,
      baseUrl: 'https://storage.googleapis.com/{bucket-name}'
    }
  };
} else {
  module.exports = {}
}