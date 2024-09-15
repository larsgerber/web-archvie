const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

// discord Webhook
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

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
        <h3>Kontaktinformationen</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Nachricht</h3>
        <p>${req.body.body}</p>
      `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_SERVER,
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
            subject: 'Du hast eine neue Anfrage',                // subject line
            text: ':D',                                     // plain text body
            html: output,                                    // html body
            sender: `${req.body.email}`,
            replyTo: `${req.body.email}`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {

            // discord webhook
            const embed = new MessageBuilder()
                .setTitle('Neue Nachricht')
                .setAuthor(`${req.body.name}`, 'https://cdn.discordapp.com/embed/avatars/0.png')
                .addField('Email', `${req.body.email}`)
                .addField('Message', `${req.body.body}`)
                .setTimestamp();

            if (error) {
                //error information
                var response = { status: 'error' }
                
                // discord webhook failed
                embed.setColor('#eb4034');
                hook.send(embed)
                    .then(() => console.log('Sent webhook successfully!'))
                    .catch(err => console.log(err.message));

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

            // discord webhook success
            embed.setColor('#34a600');
            hook.send(embed)
                .then(() => console.log('Sent webhook successfully!'))
                .catch(err => console.log(err.message));

            res.end(JSON.stringify(response));
        });
    });
}