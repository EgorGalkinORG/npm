const moment = require('moment');

function getDate() {
    const date = moment().format('YYYY/MM/DD HH:mm:ss');
    console.log(date);
}

getDate();