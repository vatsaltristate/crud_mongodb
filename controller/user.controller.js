const db = require("../models");
const User = db.crud;

class UserController {

    // create user

    async createUser (req, res) {
      try {
        // console.log("body :: :: :: :: :: ::",req.body)
        // console.log("req :: :: :: :: :: ::",req)
        
        var user = await User.create(req.body);
        res.status(201).json({ data: user, status: 201 });
      } catch (error) {
        console.log(error, " :: :: :: :: :: error")
        res
          .status(error.status || 500)
          .json({ message: error.message, status: error.status || 500 });
      }
    }

    // find all user

    async findAllUser(req, res) {
      try {
        const title = req.query.title;
        var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
        // var users = await User.find({ where: condition });
        var users = await User.find({ where: condition });
        // console.log(users, ':: :: :: USER')
        return res.status(200).json({
          status: 200,
          data: users,
        });
      } catch (err) {
        res.status(501).json({ message: err.message, status: 501 });
      }
    }

    // find one uesr by id
    async findoneUser (req, res) {
      try {

        var id = req.params.id;
        // console.log('id :: :: ::', id);

        const showdata = await User.findById(id)

        // console.log('showdata :: ::: :: ::',showdata);

        if(!showdata){
          res.status(404).send('data not found')
        }else{
          res.status(200).json({status:200, data : showdata})    
        }

      }catch(err){
        res.status(501).json({ message : err.message, status : 501});
      }
    }

    // delete a user

    async deleteUser(req, res) {
      try {
        var id = req.params.id;
        // console.log('id :: :: ::', id);
        // await validator.enterID(req.params.id);
        // console.log('user :: :: ::', user);

        var data = await User.findByIdAndRemove(id);

        // console.log('data :: :: ::', data);
        if (data) {
          res.send({ message: "data delete successfully" });
        } else {
          res.send({ message: "data can not delete" });
        }
      } catch (err) {
        res.status(501).json({ message: err.message, status: 501 });
      }
    }
    
    // update user

    async updateUser(req, res) {
      try {

        const id = req.params.id;
        
        // console.log('body :: :: :: ', req.body);
        // console.log('id :: :: :: ', id);
        
        const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        
        if (!data) {
          res.send({ message: "data not updated" });
        } else {
          res.send({ message: "data update successfully" });
        }
      } catch (err) {
        res.status(501).json({ message: err.message, status: 501 });
      }
    }
  
      
}

module.exports = new UserController();