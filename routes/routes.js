const express= require("express"),
      router = express.Router(),
      model = require("../models/model");


router.get('/', (req,res) =>{

    //displaying tasks
    model.todo.find({},(err,docs) =>{
        if(err) console.log("err");
        else{
            res.render("pages/home", {docs:docs});
        }
    });
});


router.post('/', (req,res) => {

    

    //adding new task
    let task = new model.todo({task: req.body.task,
                               done: false});

    //saving to database
    task.save((err,task) => {
        if (err) return console.error(err);
        else res.redirect('/');
        
    });

    
});

router.get('/delete/:id', ( req,res) => {
    model.todo.deleteOne({_id: req.params.id},(err) =>{
        if(err)console.log("error");
        else res.redirect('/');
    });
});


module.exports = router;