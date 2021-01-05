const User = require ('../models/User');

// metodos : 
//index(criando um metodo para listar listagem ),
//show(listar uma unica sessão)
//store(Criando uma sessão)
//update(altera uma sessão)
//destroy(deletar uma sessão)


module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user){

            user = await User.create({email});
        }
        return res.json(user);
    }
};