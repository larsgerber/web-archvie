const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

module.exports.send_mail_post = (req, res) => {

    //client check!
    if (req.body.key === undefined || req.body.key === '' || req.body.key === null) {
        var response = { status: 'error' }
        return res.end(JSON.stringify(response));
    }

    // google captcha api
    const secretKey = process.env.CAPTC_SEC_KEY;
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.key + "&remoteip=" + req.connection.remoteAddress;

    // connection timeout to validate
    const options = {
        url: verificationURL,
        timeout: 3000
    };

    request(options, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            var response = { status: 'error' }
            return res.end(JSON.stringify(response));
        }

        // mail body layout
        const output = `
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.body}</p>
      `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.infomaniak.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${req.body.name} <${req.body.email}>`,   // sender address, doesn't work with gmail.
            to: process.env.MAIL_RECEIVER,                  // list of receivers
            subject: 'Node Contact Request',                // subject line
            text: ':D',                                     // plain text body
            html: output,                                    // html body
            sender: `${req.body.email}`,
            replyTo: `${req.body.email}`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //error information
                var response = { status: 'error' }
                res.end(JSON.stringify(response));
                return console.log(error);
            }

            //send information
            var response = { status: 'success' }
            var info = {
                sender: info.envelope.from,
                time: info.messageTime,
                size: info.messageSize
            }
            console.log('\nNodemailer sent an e-mail.');
            console.log(info);
            res.end(JSON.stringify(response));
        });
    });
}