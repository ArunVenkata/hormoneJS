export async function UserAuthMiddleware(req, res, next) {
  const token = req.headers.authorization || '';
  const access_token = token.split(' ').pop();
  req.auth_user = null;
  
  if (!access_token) {
    return next();
  }
  
  // Simulating the database query (replace with your actual code)
//   const token_instance = await AccessTokenModel.where({ accessToken: access_token }).findOne().populate('user');

//   if (!token_instance) {
//     return next();
//   }

//   req.auth_user = token_instance.user.toJSON();
//   req.auth_user._id = `${req.auth_user._id}`;
  return next();
}