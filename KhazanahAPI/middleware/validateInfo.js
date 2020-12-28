module.exports = (req, res, next) => {
    
    const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(TX_USER_EMAIL)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![TX_USER_EMAIL, TX_USER_PASSWORD].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(TX_USER_EMAIL)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };