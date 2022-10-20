const isEqual = Handlebars.registerHelper('isEqual', function (value1, value2){
    return value1 = value2
})

module.exports = isEqual;