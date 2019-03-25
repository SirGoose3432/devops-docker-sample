const fetch = require("node-fetch");

async function asyncHealthCheck() {
  const response = await fetch("http://localhost:5000/api/killme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ post: "test" })
  }).catch(err => {
    console.log(err);
  });

  const status = await response.status;
  console.log(`HEALTHCHECK STATUS: ${status}`);
  if (status === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

asyncHealthCheck();

// const healthCheck = () => {
//   const Http = new XMLHttpRequest();
//   const url = "api/killme";
//   Http.open("POST", url);
//   Http.send();
//   Http.onreadystatechange = e => {
//     console.log(this.status);
//   };
//   console.log(`HEALTHCHECK STATUS: ${Http.status}`);
//   console.log(Http);
//   if (Http.status === 200) {
//     process.exit(0);
//   } else {
//     process.exit(1);
//   }
// };

// healthCheck.on('error', function (err) {
//     console.error('ERROR');
//     console.log(err);
//     process.exit(1);
// });
//
// healthCheck();
