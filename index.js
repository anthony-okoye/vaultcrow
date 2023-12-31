// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Web5 } = require('@web5/api');
const { setWeb5Instance, setDidInstance } = require('./web5Instance');

const startServer = async () => {
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Instantiate Web5 and Create DID
const { web5, did } = await Web5.connect();
// Set the instances in the module
setWeb5Instance(web5);
setDidInstance(did);
// Write DWN Records
const { record } = await web5.dwn.records.create({
    data: 'Hello, Web5!',
    message: {
      dataFormat: 'text/plain',
    },
  });
  console.log('writeResult', record);

  // Read DWN Records
  const readResult = await record.data.text();
  console.log('readResult', readResult)

  // Update DWN Records
  const updateResult = await record.update({
    data: 'Hello, Web5! I am updated.',
  });
  console.log('updateResult', await record.data.text())

  // Get the recordId from the created record
  const recordId = record.id;

  // Delete DWN Records
  const deleteResult = await web5.dwn.records.delete({
    message: {
      recordId: recordId,
    },
  });
  console.log('deleteResult', deleteResult)

// Define your MongoDB schema and model in the 'models' folder

// Define your routes in the 'routes' folder

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
};

startServer();
