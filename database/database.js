let mongoose = require('mongoose');

const server = 'mongodb://u07sepb3pas455utv75n:fCypzvGDwvNXY3eesjCm@bfowxun153bbeyl-mongodb.services.clever-cloud.com:27017/bfowxun153bbeyl'; // REPLACE WITH YOUR DB SERVER
const database = 'bfowxun153bbeyl';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(server)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()