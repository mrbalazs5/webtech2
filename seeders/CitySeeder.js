import City from '../models/city.model';
import xlsx from 'xlsx';

class CitySeeder{

    async run(){

        const workbook = xlsx.readFile('./app/data/cities.xls');
        const sheet_name_list = workbook.SheetNames;

        const cities = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        return City.create(cities);

    }

}

export default CitySeeder;