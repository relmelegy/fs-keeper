const firebaseAdmin = require('../config/firebaseAdminSetup');

// Middleware to verify Firebase ID token and extract user UID
const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const idToken = authorizationHeader.split(' ')[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;

    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized access, invalid ID token' });
  }
};

module.exports = verifyToken;
