const http = require('http');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const options = {
    host: '0.0.0.0',
    port: 5000,
    timeout: 2000
};

const healthCheck = () => {
  const Http = new XMLHttpRequest();
  const url='http://localhost:5000/api/killme';
  Http.open("POST", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
    console.log(this.status)
  }
    console.log(`HEALTHCHECK STATUS: ${Http.status}`);
    if (Http.status === 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
}

// healthCheck.on('error', function (err) {
//     console.error('ERROR');
//     console.log(err);
//     process.exit(1);
// });
//
healthCheck();
