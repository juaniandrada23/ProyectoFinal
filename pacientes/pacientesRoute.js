const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM pacientes', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO pacientes set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente added!')
        })
    })
})

routes.delete('/:idpaciente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM pacientes WHERE idpaciente = ?', [req.params.idpaciente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente excluded!')
        })
    })
})

routes.put('/:idpaciente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE pacientes set ? WHERE idpaciente = ?', [req.body, req.params.idpaciente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente updated!')
        })
    })
})

module.exports = routes