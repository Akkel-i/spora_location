

async function logData() {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await response.json();
    console.log(data);

    var jtn = "";

    for (const key in data) {
        const value = data[key];
        jtn += `${key}'  : ${value} `;
      }

      for (const key in data) {
        const value = data[key];
        console.log(`${key}: ${value}`);
      }

    document.getElementById("map").innerHTML = jtn;
  }

logData();

//var map = L.map('map').setView([51.505, -0.09], 13);