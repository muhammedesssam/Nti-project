const { verify } = require('jsonwebtoken');
const userModel = require('../../models/userModel');
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('bearer ', '');
    const decodedToken = verify(token, process.env.JWTKEY);
    const userData = await userModel.findOne({
      _id: decodedToken._id,
      'tokens.token': token,
    });
    if (!userData) throw new Error('unauthorized');
    req.user = userData;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({
      status: 'failed',
      error: e.message,
      message: 'unauthorized',
    });
  }
};

module.exports = auth;
