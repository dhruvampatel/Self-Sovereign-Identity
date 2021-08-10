module.exports.result = async (req, res) => {
    console.log('Fetching verification data...');
    const credentialsClient = req.instance;

    const verification = await credentialsClient.getVerification(req.body.id);

    console.log(verification);
    res.json({verification});
}