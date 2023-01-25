const Music = require("../model/music_model")
const ResponseMessage = require("../helpers/ResponseMessage")

const musicQuery = {
    getAllMusic: async()=>{
        let musics = await Music.findAll({raw:true});
        return musics
    }
}

const musicMutation = {
    addMusic: async(_,{musicInput},ctx,info)=>{
        try {
            const newMusic = await Music.create(musicInput)
            console.log(newMusic);
            return newMusic.dataValues
        } catch (error) {
            console.log("Une erreur c'est produit ",e);
        }
     
    }
}

module.exports = {musicQuery,musicMutation}