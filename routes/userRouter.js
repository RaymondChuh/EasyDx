const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.post((req, res) => {
    let org = req.body.org;
    cmd.get(
        `sfdx force:user:list -u ${org} --json`,
        function(err, data, stderr) {
            if(!err) {
                res.statusCode = 200;
                res.send(data);
            } else {
                res.statusCode = 202;
                let errObj = JSON.parse(stderr);
                res.send({"err": errObj.message});
            }
        }
    );
});

module.exports = userRouter;