const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const { json } = require('express')

app.use(cors())
app.use(json())

const db = mysql.createConnection({
    user: "root",
    password: "",
    database: "workers",
    host: "localhost"
})

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const city = req.body.city
    const position = req.body.position
    const salary = req.body.salary

    db.query("INSERT INTO worker (name,age,city,position,salary)VALUES(?,?,?,?,?)", [name, age, city, position, salary], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(req.body)
        }
    })


})

app.get('/show', (req, res) => {
    db.query('SELECT * FROM worker', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params

    db.query(`DELETE FROM worker WHERE id=${id}`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send("Deleted")
    })
})


app.put('/change/:id', (req, res) => {
    const { id } = req.params
    const name = req.body.name
    const age = req.body.age
    const city = req.body.city
    const position = req.body.position
    const salary = req.body.salary
    console.log(salary)
    db.query(`UPDATE worker SET id=?, name=?,age=?,city=?,position=?,salary=? WHERE id=${id}`, [id,name, age, city, position, salary], (err, result) => {
        if (err) {
            console.log(err)
        } else {
           res.status(200).send(req.body)
        
        }
    })
})

app.listen(3001, () => { console.log('Server is running on port 3001') })