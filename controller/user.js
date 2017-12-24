const User = require('../model/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const constants = require('../config/constants.js')



const userController = {}

userController.signUp = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        email: req.body.email
    })

    user.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Error ', err
            });
        }
        else {
            res.status(200).json({
                data: data
            })
        }
    })
}

userController.login = (req, res) => {
    console.log("check ", req.body.username != '');
    if (req.body.username != '' && req.body.password != '') {
        User.findOne({ username: req.body.username, password: req.body.password }, (error, data) => {
            if (error) {
                res.json.status(500)(error);
            }
            else {
                if (!data) {
                    res.status(400).json({
                        data: 'user does not exist'
                    })
                }
                else {
                    payload = data.toObject()
                    var token = jwt.sign({
                        payload
                    },
                        constants.JWT_ADMIN_SECRET
                    );
                    res.status(200).json({
                        name: req.body.username,
                        scretKey: token
                    })
                }
            }
        })
    }
    else {
        res.status(402).json({
            data: 'All field is mendatory'
        })
    }

}

userController.getUser = (req, res) => {
    User.find({}, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: data
            })
        }
    })
}

userController.getUserPagination = (req, res) => {
    let sendData = parseInt(req.query.limit);
    User.find({}, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: data,
                restult: 'testing'
            })
        }
    }).skip((sendData * parseInt(req.query.page)) - sendData).limit(sendData)

}


userController.sendUniqueBaseddata = (req, res) => {
    User.findOne({ _id: req.query.userId }, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: data
            })
        }
    })
}

userController.updateUniqueBaseddata = (req, res) => {
    User.findOneAndUpdate({ username: req.body.username }, { username: req.body.username, mobile: req.body.mobile, email: req.body.email }, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: data
            })
        }
    })
}

userController.deleteUniqueBaseddata = (req, res) => {
    User.findOneAndRemove({ _id: req.query.userId }, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: 'User delete successful'
            })
        }
    })
}

userController.searchData = (req, res) => {
    User.find({ username: { $regex: req.query.username, $options: 'i' } }, (error, data) => {
        if (error) {
            res.status(400).json(error)
        }
        else {
            res.status(200).json({
                data: data
            })
        }
    })
}

module.exports = userController
