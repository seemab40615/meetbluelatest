'use strict';

const Logger = require('../../src/Logger');
const log = new Logger('Server');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, '../../.env.local')
  });

const fetch = require('node-fetch');

// const API_ENDPOINT = `${process.env.APP_API_SERVICE_URL}/v1/user/calendar/meeting/chkpassword/rjo-igk-63/?password=596140`;
const API_ENDPOINT = `${process.env.APP_API_SERVICE_URL}/v1/user/calendar/meeting/chkpassword`;

function organizer(req, res) {
  const { room, password } = req.body;
log.debug('APIENDPOINT',API_ENDPOINT)
  fetch(`${API_ENDPOINT}/${room}?password=${password}`,{
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response =>response)
    .then(data => {
      if (data.ok) {
        res.status(200).json({ allow: true });
      } else {
        res.status(401).json({ allow: false });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

module.exports = organizer;
