module.exports = {

    // Incrémentation Tableau Article - User - Message  //
    inc: (value, option) => {
        return parseInt(value) + 1
    },
    // Pour les commentaires //
    ifCond: (v1, v2, options) => {
        console.log('ifcond', v1, v2, options)
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}