const express = require("express");
const { getEjs } = require("../controllers/staticController");
const URL = require("../models/url");
const USER = require("../models/user");
const { restrictTO } = require("../middlewares/auth");

const router = express.Router();

// router.get('/', getEjs)



router.get("/admin",restrictTO(["ADMIN"]),async (req, res) => {
     try {
          if (!req.user) return res.redirect("/signin")
          
          const allUrls = await URL.find({});
           const id = req.query.id;
               return res.render('home', {
                    urls: allUrls,
                    id: id,
                    role:req.user.role
              
               });
          } catch (error) {
               console.error(error);
               return res.render('home', { error: "An error occurred while fetching URLs." });
     }
     //OR
          // return res.render("signup")
     })


router.get("/",restrictTO(["NORMAL","ADMIN"]),async (req, res) => {
     try {
          if (!req.user) return res.redirect("/signin")
          const allUrls = await URL.find({ createdBy: req?.user?._id });
           const id = req.query.id;
               return res.render('home', {
                    urls: allUrls,
                    id:id
               });
          } catch (error) {
               console.error(error);
               return res.render('home', { error: "An error occurred while fetching URLs." });
     }
     //OR
          // return res.render("signup")
     }
    

)


router.get('/signup', (req, res) => {
return res.render("signup")
})

router.get('/signin', (req, res) => {
return res.render("signin")
})



module.exports = router;