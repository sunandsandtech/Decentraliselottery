module.exports = app => {
    const result = require("../controllers/result.controller.js");
    // Retrieve all Customers
    //app.get("/result", result.getlotterydata);
    app.get("/result", result.findAll);

    // Retrieve all stats
    //app.post("/searchstats", result.searchstats);
    app.get("/result/:id", result.findById);
    // Delete a Customer with customerId
   // app.delete("/result/:customerId", result.delete);
  
  };
  