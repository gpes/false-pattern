module.exports = app => {
    const Calc = app.models.calc

    let repository = {
        create: async data => {
            let calc = new Calc(data)
            return await calc.save()
        },

        getAll: async () => {
            return await Calc.find({})
        }
    }   

    return repository
}