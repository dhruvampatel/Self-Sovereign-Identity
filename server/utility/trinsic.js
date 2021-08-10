const { CredentialsServiceClient, Credentials } = require("@trinsic/service-clients");

module.exports.trinsicInit = () => {
    const credentialsClient = new CredentialsServiceClient(
        new Credentials(process.env.TRINSIC_API),
        { noRetryPolicy: true }
    );

    return credentialsClient;
}
  
