const express= require("express"),
      router = express.Router(),
      model = require("../models/model");


router.get('/', (req,res) =>{
    res.render('pages/home');
});


router.post('/', (req,res) => {
    //adding new task
    let task = new model.todo({task: req.body.task,
                               done: false});
    //saving to database
    task.save((err,task) => {
        if (err) return console.error(err);
        
    })
    
    
});


module.exports = router;