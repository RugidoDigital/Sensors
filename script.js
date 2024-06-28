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

const umidade = document.getElementById('umidade').getContext('2d');
const currentUmidade = [];

const intensidadeUV = document.getElementById('intensidadeUV').getContext('2d');
const currentIntensidadeUV = [];

const intensidadeVento = document.getElementById('intensidadeVento').getContext('2d');
const currentVento = [];

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

const charUmidade = new Chart(umidade, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperatura em Tempo Real',
      borderColor: 'rgb(75, 192, 192)',
      data: currentUmidade,
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

const charUV = new Chart(intensidadeUV, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperatura em Tempo Real',
      borderColor: 'rgb(75, 192, 192)',
      data: currentIntensidadeUV,
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

const charVento = new Chart(intensidadeVento, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperatura em Tempo Real',
      borderColor: 'rgb(75, 192, 192)',
      data: currentVento,
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
  const umidade = data.umidade;
  const uv = data.intensidadeUV;
  const vento = data.velocidadeVento;
  const timestamp = new Date().toLocaleTimeString();

  // Adicionar dados ao gráfico
  temperatureData.push(temperature);
  currentTemperatureDHT.push(temperatureDHT);
  currentUmidade.push(umidade);
  currentIntensidadeUV.push(uv);
  currentVento.push(vento);

  labels.push(timestamp);


  // Manter um número limitado de pontos no gráfico para evitar sobrecarga
  if (temperatureData.length > 20) {
    temperatureData.shift();
    currentTemperatureDHT.shift();
    currentUmidade.shift();
    currentIntensidadeUV.shift();
    currentVento.shift();
    labels.shift();
  }

  // Atualizar o gráfico
  chart.update();
  chartDHT.update();
  charUmidade.update();
  charUV.update();
  charVento.update();

  // Atualizar a tag <h1> com a temperatura atual
  updateTemperatureDisplay(temperature, temperatureDHT, umidade, uv, vento);
});

function updateTemperatureDisplay(temperature, temperatureDHT, umidade, uv, vento) {
  // Selecionar a tag <h1> pelo ID
  const temperatureDisplay = document.getElementById('currentTemperature');
  temperatureDisplay.textContent = ` ${temperature}°C`;

  const temperatureDisplayDHT = document.getElementById('currentTemperatureDHT');
  temperatureDisplayDHT.textContent = ` ${temperatureDHT}°C`;

  const DisplayUmidade = document.getElementById('currentUmidade');
  DisplayUmidade.textContent = `${umidade}`;

  const DisplayUV = document.getElementById('currentIntensidadeUV');
  DisplayUV.textContent = `${uv}`;

  const DisplayVento = document.getElementById('currentVento');
  DisplayVento.textContent = `${vento} m/s`;
}
});



