module.exports = app => {
    const Calc = app.models.calc

    let repository = {
        create: async data => {
            let calc = new Calc()
            
            calc.usuario = data.usuario
            calc.exp = data.exp
            data.pulls.forEach(obj => {
                calc.pulls.push(obj)
            });
            
            return await calc.save()
        },

        getAll: async () => {
            return await Calc.find({})
        }
    }   

    return repository
}