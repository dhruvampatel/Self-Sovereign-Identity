module.exports.verify = async (req, res) => {
    console.log('Verifying...');
    const credentialsClient = req.instance;

    let attributePolicies = [
        {
        policyName: "Transcript",
        attributeNames: ['name', 'grade', 'student_id', 'course', 'year'],
        }
    ];
    
    let verification = await credentialsClient.createVerificationFromParameters({
        name: "Transcript",
        version: "1.0",
        attributes: attributePolicies,
    });

    console.log(verification);
    res.json({verification});
}