const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		const user = getUserByEmail(email)
		if(user === null || !user) {
			return done(null, false)
		}
		try {
			if(await bcrypt.compare(password, user.password)) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		} catch (e) {
				return done(e)
		}
	}
	passport.use(new localStrategy({ usernameField: 'email'}, 
	authenticateUser))
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
