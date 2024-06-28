// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBO5qn_xQDJQt61jVojeNesEOE72YMZrKs",
    authDomain: "sensors-hope.firebaseapp.com",
    databaseURL: "https://sensors-hope-default-rtdb.firebaseio.com",
    projectId: "sensors-hope",
    storageBucket: "sensors-hope.appspot.com",
    messagingSenderId: "161096021155",
    appId: "1:161096021155:web:b857a0c81ff8f024793b16"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('temperatureChart').getContext('2d');
  const temperatureData = [];
  const labels = [];

  const dht = document.getElementById('temperatureChartDHT').getContext('2d');
  const currentTemperatureDHT = [];
  const labelsDHT = [];

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperatura em Tempo Real',
        borderColor: 'rgb(75, 192, 192)',
        data: temperatureData,
      }]
    },
    options: {
      scales: {
        x: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  });


  const chartDHT = new Chart(dht, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperatura em Tempo Real',
        borderColor: 'rgb(75, 192, 192)',
        data: currentTemperatureDHT,
      }]
    },
    options: {
      scales: {
        x: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  });

  // Escutar mudanças no Firebase
  database.ref('sensores').on('child_added', (snapshot) => {
    const data = snapshot.val();
    console.log("dados que estão chegando:", data);
    const temperature = data.temperaturaDS18B20;  // Ajuste conforme a estrutura dos seus dados
    const temperatureDHT = data.temperaturaDHT;
    const timestamp = new Date().toLocaleTimeString();

    // Adicionar dados ao gráfico
    temperatureData.push(temperature);
    currentTemperatureDHT.push(temperatureDHT);
    labels.push(timestamp);


    // Manter um número limitado de pontos no gráfico para evitar sobrecarga
    if (temperatureData.length > 20) {
      temperatureData.shift();
      labels.shift();
    }

    // Atualizar o gráfico
    chart.update();
    chartDHT.update();

    // Atualizar a tag <h1> com a temperatura atual
    updateTemperatureDisplay(temperature, temperatureDHT);
  });

  function updateTemperatureDisplay(temperature, temperatureDHT) {
    // Selecionar a tag <h1> pelo ID
    const temperatureDisplay = document.getElementById('currentTemperature');
    temperatureDisplay.textContent = ` ${temperature}°C`;

    const temperatureDisplayDHT = document.getElementById('currentTemperatureDHT');
    temperatureDisplayDHT.textContent = ` ${temperatureDHT}°C`;
  }
});



