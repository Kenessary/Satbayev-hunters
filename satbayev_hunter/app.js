const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()


const authRoutes = require('./routes/auth.js')
const authadminRoutes = require('./routes/authadmin')
const submissionRoutes = require('./routes/submission.js')
const commissionRoutes = require('./routes/commission.js')
const voteRoutes = require('./routes/vote.js')
const voteresultRoutes = require('./routes/voteresult.js')
const keys = require('./config/keys.js')
const app = express()
const Pusher = require('pusher');


const pusher = new Pusher({
  appId: '1003836',
  key: 'bfbf8e0c603972252b73',
  secret: '1c8ff05d105888460640',
  cluster: 'ap2',
  encrypted: true
});

mongoose.connect(keys.mongoURI, 
    {useNewUrlParser: true, useUnifiedTopology: true } )
    .then(()=> console.log('MongoDB Connected'))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)



app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});



app.use('/api/auth', authRoutes)
app.use('/api/authadmin', authadminRoutes)
app.use('/api/submission', submissionRoutes)
app.use('/api/commission', commissionRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/voteresult', voteresultRoutes)

app.post("/api/sendmail", (req, res)=>{
  const {body} = req;
  const user = {...body}

  sendMail(user, info => {
    console.log(`Ok`);
    res.send(info);
  });
})

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    service:'gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: 'satbayevuniversity.hr@gmail.com',
    to: user.email, 
    subject: "Отдел кадров Satbayev University", 
    html: `<h2>${user.text}</h2>`
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

app.post('/api/voted', (req, res) => {
  const {body} = req;
  const data = {
    ...body,
    // set the selected property of the body to true
    selected: true,
  };
  // trigger a new-entry event on the vote-channel
  pusher.trigger('vote-channel', 'new-entry', data);
  res.json(data);
});


module.exports = app