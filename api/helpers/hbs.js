module.exports = {

    // On définit notre fonction //
    limitArray: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
      // Incrémentation Tableau  //
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
    },
     // Dates Commentaire //
     formatDate: function (date, format) {
        return moment(date).utc().format(format)
    }

}