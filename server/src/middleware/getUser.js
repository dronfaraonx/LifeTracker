const { User } = require("../../db/models");

const userSession = async (req, res, next) => {  
  try {
    console.log("req.session.user_sid middleware check",req.session.user_sid);
    console.log("req.session",req.session);
    
    if (req.session?.user_sid) {
      const user = await User.findByPk(req.session.user_sid);
      console.log("middleware user", user);
      
      
      if (user) {
        res.locals.user = user;  
        console.log("middleware res.locals check: ", res.locals);
        
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
    res.status(500).json({message: 'error'});
  }
};

module.exports = userSession;
