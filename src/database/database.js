const mongoose = require("mongoose");

function Connect() {
    mongoose.connect(process.env.MONGODB_URI, {
    }).then(() => {
        console.log("Conexão com o mongo db estabelecida com sucesso");
    }).catch(error => {
        console.log("Erro ao conectar com o mongodb", error);
    })
}

module.exports = Connect;