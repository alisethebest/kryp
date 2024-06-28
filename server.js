// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const upload = require('./multerConfig')
const {
    imageRoutes,
    blockchain,
    bot,
    contact,
    faq,
    footer,
    membership,
    mission,
    privacypolicy,
    roadmap,
    spacedInRegister,
    termconditon,
    training,
    trainingdetail,
    }= require('./routes/index');
const {auth} = require('./middleware/index')
const {signIn, signUp} = require('./controllers/authControllers');
const { members, deleteMembers, memberCounts, makeLoggedIn, loggedInCount } = require('./controllers/adminController');
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.static('./'))
app.use(express.json());

// Connect to MongoDB
connectDB();


// app.use('/', auth, bot, blockchain, membership, mission, roadmap, spacedInRegister, training, trainingdetail, contact, faq, footer, privacypolicy, termconditon);
app.use('/',  bot, blockchain, membership, mission, roadmap, spacedInRegister, training, trainingdetail, contact, faq, footer, privacypolicy, termconditon);

app.use('/api', imageRoutes);
app.post('/signUp', upload.single('avatar'), signUp)
app.post('/signIn', signIn)
app.post('/members', members)
app.post('/member/delete', deleteMembers)
app.get('/counts', memberCounts)
app.post('/logged_in', makeLoggedIn)
app.get('/logged_in_counts', loggedInCount)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
