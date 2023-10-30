const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res) => {
  res.send('Server is running.');
});
