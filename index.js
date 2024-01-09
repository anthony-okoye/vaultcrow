// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Web5 } = require('@web5/api');
const { setWeb5Instance, setDidInstance } = require('./web5Instance');
const escrowProtocol = require('./protocols/protocols');

let serverDid;

const initWeb5 = async () => {
  // Instantiate Web5 and Create DID
  const { web5, did } = await Web5.connect();
  // Set the instances in the module
  setWeb5Instance(web5);
  setDidInstance(did);

  if (web5 && did) {
    await configureProtocol(web5, did);
    serverDid = did; // Save the did value for later use
  }

  return web5; // Return the initialized web5 object
};

const installProtocolLocally = async (web5, escrowProtocol) => {
  return await web5.dwn.protocols.configure({
    message: {
      definition: escrowProtocol,
    },
  });
};

const queryForProtocol = async (web5) => {
  return await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: "https://escrow-system.xyz/escrow-system-protocol",
      },
    },
  });
};

const configureProtocol = async (web5, did) => {
  const { protocols: localProtocol, status: localProtocolStatus } =
    await queryForProtocol(web5);
  console.log({ localProtocol, localProtocolStatus });
  if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
    const { protocol, status } = await installProtocolLocally(web5, escrowProtocol);
    console.log("Protocol installed locally", protocol, status);

    const { status: configureRemoteStatus } = await protocol.send(did);
    console.log("Did the protocol install on the remote DWN?", configureRemoteStatus);
  } else {
    console.log("Protocol already installed");
  }
};

const createDwnRecord = async (web5, data, dataFormat) => {
  return web5.dwn.records.create({
    data: data,
    message: {
      dataFormat: dataFormat,
    },
  });
};

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Enable CORS
  app.use(cors());

  const web5 = await initWeb5(); // Initialize web5 object

  // Write DWN Records
  // Endpoint to handle form submissions
  app.post('/submit-form', async (req, res) => {
    try {
      const { name, email, age } = req.body;

      // Validate the incoming data
      if (!name || !email || !age) {
        return res.status(400).json({ error: 'Invalid input. Please provide all details.' });
      }

      // Create a DWN record
      const { record } = await createDwnRecord(web5, { name, email, age }, 'application/json');

      // You can do additional processing or database storage here if needed

      res.status(201).json({ record }); // Respond with the created record
      console.log('writeResult', record);
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to get the "did" value
  app.get('/get-did', (req, res) => {
    const did = serverDid; // Save the did value for later use;
    res.json({ did });
  });

  // ... (rest of the code)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
