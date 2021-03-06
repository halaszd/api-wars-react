if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const methodOverride = require('method-override')
const port = 3000;
const axios = require('axios');

const initPassport = require('./passport-config');

initPassport(
	passport,
	email => users["users"].find(user => user.email === email),
	id => users["users"].find(user => user.id === id),
)

function fileExistsSync(file) {
    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
      } catch (err) {
        return false;
      }
}

let users = {"users": []};

if(fileExistsSync('users.json')){
    fs.readFile('users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err)
        } else {
            users = JSON.parse(data);
        }    
})} else {
        const jsonToWrite = JSON.stringify(users)
        fs.writeFile('users.json', jsonToWrite, 'utf8', () => {})
    }

app.use(express.urlencoded({ extended: false }))

// for initPassport and for our server to know how to use passport
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))
app.use(express.json())

// Starting requests
app.use("/static", express.static(path.join("../", "frontend", "build", "static")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../frontend/build/index.html"));
})

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "./../frontend/build/index.html"));

})

app.get("/registration", checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "./../frontend/build/index.html"));
})

app.get("/is-auth", (req, res) => {
    const infos = {};
    if(req.isAuthenticated()) {
        infos["name"] = req.user.name;
        infos["isAuth"] = true;
    } else {
        infos["name"] = "";
        infos["isAuth"] = false;
    }

    res.send(JSON.stringify(infos))
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
	})
)

app.post('/registration', checkNotAuthenticated, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
        isRegistered = false;
        for(user of users["users"]) {
            if(user.name === req.body.name){
                isRegistered = true;
            }
        }
        if(!isRegistered){
            fs.readFile('users.json', 'utf8', function readFileCallback(error, data) {
                if (error) {
                    console.log(error)
                } else {
                    users = JSON.parse(data);
                    users["users"].push({
                        id: Date.now().toString(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    const jsonToWrite = JSON.stringify(users)
                    fs.writeFile('users.json', jsonToWrite, 'utf8', () => {})
                }
            })
            res.redirect('/login')
        } else {
            res.redirect('/registration')
        }
	} catch (error){
        console.log(error)
		res.redirect('/registration')
	}
})

app.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login')
})

app.get("/planets", async (req, res) => {
    if(req.query.page){
        if(parseInt(req.query.page) < 1) {
            req.query.page = "1";
        }
        let planets;
        await axios.get(`https://swapi.dev/api/planets/?page=${req.query.page}`)
            .then(function (response) {planets = response.data})
        res.send(JSON.stringify(planets))
    }
})

app.post("/people", async (req, res) => {
    let people = {"people": []};
        for(residentLink of req.body.residents){
            await axios.get(residentLink).then(function (response) {
            people["people"].push(response.data)

        })}
    res.send(JSON.stringify(people))
 })

let votes = {};

if(fileExistsSync('votes.json')){
    fs.readFile('votes.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("this is votes data", data)
            console.log("This is parsed", JSON.parse(data)) 
            votes = JSON.parse(data); 
        }     
    })} else {
    console.log("188", JSON.stringify(votes))
        const jsonToWrite = JSON.stringify(votes)
        fs.writeFile('votes.json', jsonToWrite, 'utf8', () => {})
    }

app.post("/vote", (req, res)=> {
    let Pname = req.body.planetName

    try {
        fs.readFile('votes.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                res.send("There was an error during the voting process.");
            } else {
                votes = JSON.parse(data);

                if (votes[Pname]) {
                    votes[Pname] += 1
                } else {
                    votes[Pname] = 1;    
                }

                const jsonToWrite = JSON.stringify(votes)
                fs.writeFile('votes.json', jsonToWrite, 'utf8', () => console.log("hello"))
                res.send("You have successfully voted on " +req.body.planetName)
            }
        })
    } catch (err) {
        res.send("There was an error during the voting process.");
  }

}) 

app.get("/votestats", (req, res) => {
    res.json(votes)
})

function checkNotAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return res.redirect('/')
	}

	next();
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
