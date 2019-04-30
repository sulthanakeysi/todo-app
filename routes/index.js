const express= require("express"),
      router = express.Router(),
      model = require("../models/model");


////////////////// displaying tasks from database //////////////////

router.get('/', (req,res) =>{
    model.todo.find({},(err,docs) =>{
        if(err) console.log("err");
        else{
            res.render("pages/home", {docs:docs});
        }
    });
});


///////////////inserting tasks into database//////////////////

router.post('/', (req,res) => {
    //adding new task
    let task = new model.todo({task: req.body.task,
                               done: false});

    //saving to database
    task.save((err,task) => {
        if (err) return console.error("database saving error");
        else res.redirect('/');
        
    });
});


///////////////update tasks in database//////////////////

router.put('/update/:id', (req, res) => {
    model.todo.findByIdAndUpdate({_id:req.params.id},
                                 {task:req.body.value},
                                 (err,doc) =>{
        //saving to database
        doc.save((err,task) => {
            if (err) return console.error("database saving error");
            else { res.send(true);
            }
        });
    });
    
});


///////////////delete tasks from database/////////////////////

router.delete('/delete/:id', ( req,res) => {
    model.todo.deleteOne({_id: req.params.id},(err) =>{
        if(err)console.log("error");
        else  res.send(true);
    });
});

//////////////update tasks when checked //////////////////

router.put('/check/:id', (req,res) => {
    model.todo.find({_id:req.params.id},(err,docs) => {
        done = docs[0].done;
        model.todo.findByIdAndUpdate({_id:req.params.id},
            {done:!done},
            (err,doc) =>{ 
                        //saving to database
                        doc.save((err,task) => {
                            if (err) return console.error("database saving error");
                            else res.send(true)
                        });
            });
        });
    });
    
    
/////////////////navigating to active tasks/////////////////////

router.get('/active',(req,res)=>{
    model.todo.find({},(err,docs) =>{
        if(err) console.log("err");
        else{
            res.render("pages/active", {docs:docs});
        }
    });

});

/////////////// navigating to completed tasks ///////////////

router.get('/completed',(req,res)=>{
    model.todo.find({},(err,docs) =>{
        if(err) console.log("err");
        else{
            res.render("pages/completed", {docs:docs});
        }
    });

});

/////////////// clearing all completed tasks//////////////////
router.delete('/clear', (req,res) =>{
    model.todo.deleteMany({done:true},(err)=>{
        if(err)console.log("error");
        else  res.send(true);
    });
});

module.exports = router;