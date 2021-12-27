module.exports = {

    validatePassword(password) {
        if (password.length < 6) {
            return { error: "Minimal length of password: 6" }
        } else {
            return { error: false }
        }
    },

    validateCharacter(char) {
        const msj = `Character ${char.name ? char.name : ''} must have a`;
        if (!char.name) {
            return { error: `${msj} Name.` }
        } else if (!char.imageURL) {
            return { error: `${msj} imageURL.` }
        } else if (!char.age) {
            return { error: `${msj} Age` }
        } else if (!char.weight) {
            return { error: `${msj} Weight` }
        } else if (!char.history) {
            return { error: `${msj} History.` }
        } else if (isNaN(Number.parseInt(char.age))) {
            return { error: `Age must be a number.` }
        } else if (isNaN(Number.parseInt(char.weight))) {
            return { error: `Weight must be a number.` }
        } else {
            return { error: false }
        }

    },

    validateMovie(movie) {

        if (!movie.title) {
            return { error: "Movie must have a Title." }
        } else if (!movie.imageURL) {
            return { error: "Movie must have a imageURL." }
        } else if (!movie.creationDate) {
            return { error: "Movie must have a Creation Date" }
        } else if (!movie.rating) {
            return { error: "Movie must have a rating (1-5)" }
        } else if (!movie.Characters) {
            return { error: "Movie must have Characters." }
        } else if (!movie.GenreId) {
            return { error: "Movie must have a genreId." }
        } else if (isNaN(Date.parse(movie.creationDate))) {
            return { error: "An error occurred parsing date. Valid format YYYY-MM-DD" }
        } else if (isNaN(movie.GenreId)) {
            return { error: "Invalid genreId type. Only numbers." }
        } else if (isNaN(movie.rating)) {
            return { error: "Invalid rating type. Only numbers. 1-5" }
        } else if (!Array.isArray(movie.Characters)) {
            return { error: "Characters must be an Array Type." }
        } else {
            movie.creationDate = Date.parse(movie.creationDate)
            return { error: false, movie }
        }
    },

    validateUser(user) {
        if (!user.name) {
            return { error: "User must have a name" }
        } else if (!user.email) {
            return { error: "User must have a email." }
        } else if (!user.password) {
            return { error: "User must have a password." }
        } else {
            const validatePassword = this.validatePassword(user.password).error
            if (validatePassword.error) return validatePassword
            return { error: false }
        }
    },

    validateLogin(user) {
        if (!user.email) {
            return { error: "Email is a required field." }
        } else if (!user.password) {
            return { error: "Password is a required field." }
        } else {
            return { error: false }
        }
    },

    validateRole(role) {
        if (!role.name) {
            return { error: "Role name is required field." }
        } else if (role.name.toLowerCase() == 'admin') {
            return { error: "Admin role is a core role. Impossible create/modify/delete role with that name." }
        } else if (role.name.toLowerCase() == 'user') {
            return { error: "User role is a core role. Impossible create/modify/delete role with that name." }
        } else {
            return { error: false }
        }

    }




}



