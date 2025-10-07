import jwt from 'jsonwebtoken';

// Login Seller : api/seller/login

export const sellerLogin = async(req, res) => {
      try {
      const {email, password } = req.body;

      if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV === "Production", //Use secure cookies in production
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
            }) 
            return res.json({success: true, message: 'Logged in successfuly'});
      } else {
            return res.json({ success: false, message: 'Invalid credentials'});
      }
                  
  }catch(error) {
      console.log(error.message);
      res.json({ success: false, message: error.message});
 }
}

// Check auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success: true,});
    } catch (error) {
         console.log("Error in the seller is-auth controller API", error.message);
        res.json({success: false, message: error.message });
    }
}


// Logout seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({sucess: true, message: "Logged Out successfuly"})
    } catch (error) {
        console.log("Error in the user login controller API", error.message);
        res.json({success: false, message: error.message });
    }
}