const Result = require("../models/result.model.js");
 
exports.findAll = (req, res) => {
    Result.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving registrations."
          });
        else res.send(data);
      });
};

exports.findById = (req, res) => {
    Result.findById(req.params.id,(err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving registrations."
          });
        else res.send(data);
      });
};