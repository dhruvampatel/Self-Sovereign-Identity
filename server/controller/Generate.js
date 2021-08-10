module.exports.generate = async (req, res) => {
    console.log('Generating Certificate...');
    const credentialsClient = req.instance;

    const credentialValues = {
        name: req.body.name,
        grade: req.body.grade,
        student_id: req.body.id,
        course: req.body.course,
        year: req.body.year
    };

    const credential = await credentialsClient.createCredential({
        definitionId: process.env.DEFENTION_ID,
        automaticIssuance: true,
        credentialValues: credentialValues
    });

    // let credential = await credentialsClient.listCredentials();

    console.log(credential);

    res.json({credential});
}