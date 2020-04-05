import User from '../models/user.model';
import roles from '../utils/roles';

class UserSeeder{

    async run(){

        const users = [{
            email: 'admin@admin.com',
            password: 'admin',
            name: 'Admin',
            role: roles.admin
        }];

        return User.create(users);

    }

}

export default UserSeeder;