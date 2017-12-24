const userRoute = require('./user.js')

module.exports = (app) => {
    app.use("/user",userRoute)
}