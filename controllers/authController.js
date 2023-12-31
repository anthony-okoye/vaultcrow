// In your controllers file:
const Web5 = require('@web5/api');
const web5 = new Web5();

exports.login = async (req, res) => {
  try {
    const did = await web5.getDid(); // Prompt user to connect wallet

    const verificationResult = await web5.did.resolve(did);
    if (!verificationResult.didDocument) {
      // DID doesn't exist, create one:
      const newDid = await web5.did.create();
      res.redirect('/app?did=' + newDid); // Redirect with new DID
      return;
    }

    // DID exists, create session token:
    const sessionToken = generateRandomToken();
    await storeSessionToken(sessionToken, did);

    res.redirect('/app'); // Redirect to app with session token
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send('Login failed'); // Handle errors gracefully
  }
};
