/* import typeorm from 'typeorm';
console.log('init');
import User from '../Users/entity_users.js';

const dataSource = new typeorm.DataSource({
	type: 'postgres',
	host: '127.0.0.1',
	port: 5430,
	username: 'postgres',
	password: 'tygomUv6',
	database: 'animalus',
	synchronize: true,
	entities: [User],
});

dataSource
	.initialize()
	.then(function (success) {
		console.log('connected');
	})
	.catch(function (error) {
		console.log('Error: ', error);
	});

export default dataSource;
 */