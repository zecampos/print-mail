const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) =>{
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/send', (req, res) => {
    const output = `
    <img src="${req.body.src}" />
    `;
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.ensaiogospel.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'financeiro@ensaiogospel.com', // generated ethereal user
                pass: 'Jose_2505' // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Server Email - Print" <financeiro@ensaiogospel.com>', // sender address
            to: 'joseguilhermesantoscampos@gmail.com', // list of receivers
            subject: 'Nova Impressão', // Subject line
            text: '', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                res.send({msg: 'Erro ao enviar'})
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.send({msg: 'Enviado com Sucesso!!!'})


        });
    });

})
app.listen(3000, () => console.log(' server started'))