const firebaseAdmin = require('firebase-admin');
// const serviceAccount = require('./fs-keeper-firebase-adminsdk-tozd4-2162000bf4.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL || "https://fs-keeper.firebaseio.com"
});

module.exports = firebaseAdmin;
