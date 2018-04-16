const User = require('../models/user');

module.exports = function(app) {
    app.get('/users', (req, res) => {
       User.getUsers((err, data) => {
           res.status(200).json(data);
       });
    });

    app.post('/users', (req, res) => {
        const userData = {
            idUsuario: null,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        User.insertUser(userData, (err, data) =>{
            if(data && data.insertId) {
                console.log(data);
               res.json({
                   succes: true,
                   msg: 'Usuario Insertado',
                   data: data
               }); 
            }else {
                res.status(500).json({
                    succes: false,
                    msg: 'Error'
                });
            }
        })
    });

    app.put('/users/', (req,  res) => {
        const userData = {
            idUsuario: req.body.idUsuario,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        User.updateUser(userData, (err, data) =>{
            if(data && data.msg) {
                res.json(data);
            }else {
                res.json({
                    success: false,
                    msg: "Error"
                })
            }
        })
    });

    app.delete('/users/:idUsuario', (req, res) => {
        User.deleteUser(req.params.idUsuario, (err, data) => {
            if(data && data.msg === "deleted" || data.msg === "no existe") {
                res.json({
                    success: true,
                    data
                })
            }else {
                res.status(500).json({
                    msg: "Error"
                })
            }
        });
    });
}

