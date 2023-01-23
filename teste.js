const fs = require("fs");

// Read users.json file
fs.readFile("feriados_nacionais_2023.json", function (err, data) {
    if (err) throw err;
    const users = JSON.parse(data);
    console.log(users);
});