const axios = require('axios');
const Dev = require('../modules/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            try {
            let apiReponse = await axios.get(`http://api.github.com/users/${github_username}`);
            //console.log(apiResponse);
                
            const { name = login, avatar_url, bio } = apiReponse.data;

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            const techsArray = parseStringAsArray(techs);
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,

            });
        } catch(err){
            console.log(err);
            
        }
        }

        return response.json(dev);
    },
    async update(request, response) {
        try {
            const { github_username } = request.params;
            const { name, bio, avatar_url, techs, latitude, longitude } = request.body;
            const devSalvo = await Dev.findOne(github_username);

            const locationUpdate = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            const techsArrayUpate = parseStringAsArray(techs);
            const devAlterado = await Dev.updateOne({ _id: devSalvo._id },
                {
                    $set: {
                        name,
                        avatar_url,
                        bio,
                        techs: techsArrayUpate,
                        location: locationUpdate,
                    }
                });

            return response.json(devAlterado);
        } catch (err) {
            return response.json({message: err});
        }

    },
    async destroy(request, response) {
        try{                
        const devExcluido = await Dev.deleteOne({ _id: request.params.devId });
        return response.json(devExcluido);
        } catch(err) {
            return response.json({message: err});
        }

    }
};