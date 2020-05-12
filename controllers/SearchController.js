import City from '../models/city.model';
import Country from '../models/city.model';
import Generation from '../models/generation.model';
import Series from '../models/series.model';
import Message from "../utils/Message";

const SearchController = {

    getCities: {
        controller: (req, res) => {
            const { name } = req.query;

            let query = {};

            if(name){
                query  = {name: { $regex: `.*${name}.*`, $options: 'i' } };
            }

            City.find(query).sort({name: 'asc'}).then((cities) => {
                res.send(cities);
            });

        }
    },
    getCountries: {
        controller: (req, res) => {
            const { name } = req.query;

            let query = {};

            if(name){
                query  = {name: { $regex: `.*${name}.*`, $options: 'i' } };
            }

            Country.find(query).sort({name: 'asc'}).then((countries) => {
                res.send(countries);
            });

        }
    },
    getGenerations: {
        controller: (req, res) => {
            const { name, modelId } = req.query;

            let query = {};

            if(name){
                query  = {name: { $regex: `.*${name}.*`, $options: 'i' } };
            }

            let generationQuery = Generation.find(query)
                .populate('series');

            if(modelId && !modelId.match(/^[0-9a-fA-F]{24}$/)){
                return res.status(422).json(new Message(['Invalid id provided.']).error())
            }

            if(modelId){
                generationQuery.populate({
                    path: 'model',
                    match: { _id: modelId }
                });
            }else{
                generationQuery.populate('model');
            }

            generationQuery.sort({name: 'asc'}).then((generations) => {

                if(modelId){
                    generations = generations.filter((generation) => {
                        return generation.model !== null;
                    })
                }

                res.send(generations);
            });

        }
    },
    getSeries: {
        controller: (req, res) => {
            const { name, generationId } = req.query;

            let query = {};

            if(name){
                query  = {name: { $regex: `.*${name}.*`, $options: 'i' } };
            }

            let seriesQuery = Series.find(query)
                .populate('specification');

            if(generationId && !generationId.match(/^[0-9a-fA-F]{24}$/)){
                return res.status(422).json(new Message(['Invalid id provided.']).error())
            }

            if(generationId){
                seriesQuery.populate({
                    path: 'generations',
                    match: { _id: generationId }
                });
            }else{
                seriesQuery.populate('generations');
            }

            seriesQuery.sort({name: 'asc'}).then((series) => {

                if(generationId){
                    series = series.filter((series) => {
                        return series.generations.length > 0;
                    })
                }

                res.send(series);
            });

        }
    }

};

export default SearchController;