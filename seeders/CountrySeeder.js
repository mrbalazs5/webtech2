import Country from '../models/country.model';

class CountrySeeder{

    async run(){

        const countries = [
            {isoCode: 'HU', name: 'Hungary'}
        ];

        return Country.create(countries);

    }

}

export default CountrySeeder;