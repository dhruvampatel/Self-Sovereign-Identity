module.exports.verify = async (req, res) => {
    console.log('Verifying...');
    const credentialsClient = req.instance;

    const verifications = await credentialsClient.listVerifications();

    console.log(verifications);
    res.send('Hi');
}