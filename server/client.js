const axios = require('axios')
axios.get('http://localhost:5000/api/items/basicItems/?id=5').catch(error => console.log(error.response.data))