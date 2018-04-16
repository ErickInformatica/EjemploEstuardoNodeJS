const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testapimysql'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if(connection) {
        connection.query('SELECT * FROM users ORDER BY idUsuario',
        (err, rows) => {
            if(err) {
                throw err;
            }else {
                callback(null, rows);
            }
        }
        )
    }
};

userModel.insertUser = (userData, callback) => {
    if(connection) {
        connection.query('INSERT INTO users SET ?', userData,
        (err, res) => {
            if(err) {
                throw err;
            }else {
                callback(null, {'insertId': res.insertId})
            }
        }
    )
    }
};

userModel.updateUser = (userData, callback) => {
    if(connection) {
        const sql = `
        UPDATE users SET
        username = ${connection.escape(userData.username)},
        email = ${connection.escape(userData.email)},
        password = ${connection.escape(userData.password)}
        WHERE idUsuario = ${connection.escape(userData.idUsuario)}`
    
        connection.query(sql, (err, res) => {
            if(err) {
                throw err;
            }else {
                callback(null, {
                    "msg": "success"
                });
            }
        })
    }
};

userModel.deleteUser = (idUsuario, callback) =>{
    if(connection) {
        const sql = `
        SELECT * FROM users WHERE idUsuario = ${connection.escape(idUsuario)}`; 
        
        connection.query(sql, (err, row) => {
            if(row) {
                let sql = `
                DELETE FROM users WHERE idUsuario = ${idUsuario}`

                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }else {
                        callback(null, {
                            msg: "deleted"
                        });
                    }
                });
            }else {
                msg: "no existe"
            }
        });
    }
}

module.exports = userModel;