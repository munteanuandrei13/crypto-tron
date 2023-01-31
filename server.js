const app = require('./app');
const mongoose = require('mongoose')
const port = 3000;

mongoose.set('strictQuery', true);
mongoose
		.connect('mongodb://localhost:27017/tron')
		.then(con => {
				console.log('DB connection successful!');
		});

const server = app.listen(port, () => {
		console.log(`App running on port ${port}`);
});