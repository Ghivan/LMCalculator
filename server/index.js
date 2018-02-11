const app = require('./app');
const PORT = 3001;


const server = app.listen(PORT, () => {
    console.log('Server works on port ' + server.address().port + '.');
});