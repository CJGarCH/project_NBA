const express = require('express');
const router = express.Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note.hbs');
});

router.post('/notes/new-note', (req, res) => {

    const { usuario } = req.body;

    const errors = [];
    const request = require('request');
    let variable1 = "";
    let variable2 = "";
    let total = "";
    let op = "";
    let arr = [];
    let respuesta = [];
    let respuesta2 = 0;


    console.log(usuario)
    request({
        url: "https://mach-eight.uc.r.appspot.com/",
        json: true
    }, (err, response, body) => {


        let datos = body;


        for (i = 0; i < body.values.length; i++) {

            for (j = 0; j < body.values.length; j++) {

                if (i > j || i < j) {

                    variable1 = parseInt(datos.values[i]["h_in"]);
                    variable2 = parseInt(datos.values[j]["h_in"]);

                    total = variable1 + variable2;

                    op = total - usuario;

                    if (op == 0) {

                        arr.push(i);

                        if (arr.includes(j) === false) {
                            let first_name1 = datos.values[i]["first_name"];
                            let last_name1 = datos.values[i]["last_name"];
                            let height1 = variable1;
                            let first_name2 = datos.values[j]["first_name"];
                            let last_name2 = datos.values[j]["last_name"];
                            let height2 = variable2;
                            total;
                            const objeto = {first_name1, last_name1, height1, first_name2, last_name2, height2, total};

                            respuesta.push(objeto);

                            console.log(datos.values[i]["first_name"], datos.values[i]["last_name"], variable1, ",", datos.values[j]["first_name"], datos.values[j]["last_name"], variable2, " ", total);

                        } 
                    }
                }
            }
        }
        console.log(respuesta)
        if(respuesta.length == 0){
             respuesta2 = 1;
        }
        res.render('notes/response', { respuesta, respuesta2 })

    });
});


module.exports = router;