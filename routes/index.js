const express= require("express"),
      router = express.Router(),
      model = require("../models/model");


//displaying tasks   
router.get('/', (req,res) =>{
    model.todo.find({},(err,docs) =>{
        if(err) console.log("err");
        else{
            res.render("pages/home", {docs:docs});
        }
    });
});

//inserting into database
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

//update database
router.put('/update/:id', (req, res) => {
    model.todo.findByIdAndUpdate({_id:req.params.id},
                                 {task:req.body.value},
                                 (err,doc) =>{
                                     // //saving to database
                                        doc.save((err,task) => {
                                            if (err) return console.error("database saving error");
                                            else {console.log("saved");
                                                }
        
                                        });
    });
    
});


//delete from database
router.delete('/delete/:id', ( req,res) => {
     model.todo.deleteOne({_id: req.params.id},(err) =>{
        if(err)console.log("error");
       else  res.send(true);
     });
});


// //active tasks
// router.get('/active', (req,res) =>{
//     model.todo.find({},(err,docs) =>{
//         if(err) console.log("err");
//         else{
//             res.render("pages/active", {docs:docs});
//         }
//     });
// });


module.exports = router;