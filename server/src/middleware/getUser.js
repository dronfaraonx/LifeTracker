const { User } = require("../../db/models");

const userSession = async (req, res, next) => {
  try {
    if (req.session?.user_sid) {
      const user = await User.findByPk(req.session.user_sid);
      if (user) {
        res.locals.user = user.get();  
      } else {
        req.session.destroy();  
        res.clearCookie('user_sid'); 
        res.locals.user = null;
      }
    } else {
      res.locals.user = null;
    }
    next();
  } catch (error) {
    console.error("Error finding user during session check:", error);
    res.sendStatus(500);
  }
};

module.exports = userSession;
