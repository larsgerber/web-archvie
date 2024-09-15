// import modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const request = require('request');
const colors = require('colors');
const sites = require('./sites.json');
const process = require('process');
const os = require('os');
const config = require('config');
const port = 3001;
const app = express();



// define app
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/src/'));
app.locals.layout = false;



// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// collect request info
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
    requests.push(Date.now());

    // now keep requests array from growing forever
    if (requests.length > requestTrimThreshold) {
        requests = requests.slice(0, requests.length - requestTrimSize);
    }
    next();
});



// router engine
app.get('*', function (req, res) {

    // get object form sites.json which matches the request url.
    var url = req.url;
    var obj = (sites.sitemap.filter(x => x.req === url)[0]);

    if (obj == null) {

        var url = (url.substring(0, 4)) + "*";
        var obj = (sites.sitemap.filter(x => x.req === url)[0]);

        if (obj == null) {
            var url = "*";
            var obj = (sites.sitemap.filter(x => x.req === url)[0]);
        }
    }

    // switch between actions
    switch (obj.act) {
        case "red":
            res.redirect(obj.res);
            break;

        case "ren":
            res.render(obj.res);
            break;

        case "sts":
            res.status(404).render(obj.res);
            break;

        case "mve":
            var path = req.url;
            var link = ("/de" + path);
            res.redirect(link);
            break;

        case "inf":
            var now = Date.now();
            var aDayAgo = 0, aHouAgo = 0, aMinAgo = 0;

            for (var i = requests.length - 1; i >= 0; i--) {
                if (requests[i] >= now - (1000 * 60 * 60 * 24)) {
                    ++aDayAgo;
                } else {
                    break;
                }
            }

            for (var i = requests.length - 1; i >= 0; i--) {
                if (requests[i] >= now - (1000 * 60 * 60)) {
                    ++aHouAgo;
                } else {
                    break;
                }
            }

            for (var i = requests.length - 1; i >= 0; i--) {
                if (requests[i] >= now - (1000 * 60)) {
                    ++aMinAgo;
                } else {
                    break;
                }
            }

            function formatBytes(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }

            var serverMemory = formatBytes(os.totalmem() - os.freemem());
            var serverUptime = (new Date(Date.now() - process.uptime() * 1000));
            var serverUptime = (serverUptime.toDateString() + " " + serverUptime.toLocaleTimeString());

            res.render(obj.res, { serverUptime: serverUptime, serverMemory: serverMemory, aDayAgo: aDayAgo, aHouAgo: aHouAgo, aMinAgo: aMinAgo });
            break;
    }
});



// nodemailer
app.post('/send', function (req, res) {

    //client check!
    if (req.body.key === undefined || req.body.key === '' || req.body.key === null) {
        var response = { status: 'error' }
        return res.end(JSON.stringify(response));
    }

    // google captcha api
    const secretKey = config.get('keys.catpcha.secretKey');
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
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.get('keys.mail.username'),
                pass: config.get('keys.mail.password')
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${req.body.name} <${req.body.email}>`,   // sender address, doesn't work with gmail.
            to: config.get('keys.mail.username'),                 // list of receivers
            subject: 'Node Contact Request',                // subject line
            text: ':D',                                     // plain text body
            html: output                                    // html body
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
});

app.listen(port, () => console.log(`Server started on port ${port}!`.cyan));