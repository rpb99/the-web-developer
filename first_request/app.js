var rp = require('request-promise');


rp('http://jsonplaceholder.typicode.com/users/1')
    .then((body) => {
		const parsedData = JSON.parse(body);
		console.log(`${parsedData.name } live in ${parsedData.address.street}`);
    })
    .catch((err) => {
      	console.log('Error', err);
    });

