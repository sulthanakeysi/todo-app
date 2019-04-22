const express = require("express"),
      app = express(),
      router= require("./routes/routes");
      

app.use('/' , router);


app.listen(3000, () => console.log("app listening"));