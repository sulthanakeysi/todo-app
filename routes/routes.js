const express= require("express"),
      router = express.Router();


router.get('/', (req,res) =>{
    res.send("success")
});


module.exports = router;