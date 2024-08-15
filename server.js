const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');  // Importar helmet

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Configura CSP con Helmet para asegurar la coherencia y evitar conflictos
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],  // Fallback default
    fontSrc: ["'self'", "https://sportclub-pinq.onrender.com", "https://cdn.jsdelivr.net"],  // Permite fuentes de estos dominios
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://sportclub-pinq.onrender.com"],  // Permite scripts de estos dominios
    connectSrc: ["'self'", "https://sportclub-pinq.onrender.com"],  // Permite conexiones a estos dominios (para Axios)
    imgSrc: ["'self'", "data:"],  // Permite imágenes del mismo origen y data URIs
    styleSrc: ["'self'", "https://cdn.jsdelivr.net"]  // Permite estilos del mismo origen y CDN
    // Puedes agregar más directivas según sea necesario
  }
}));

app.post('/buscar-socio', async (req, res) => {
  const { documento } = req.body;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://integraciones.prod.sportclub.com.ar/xl/socio/',
      headers: {
        'api-key': 'zOaLXtdje2xUQZUSeSItxF7KlHcEXYKPX0k4EDFpOM0yWy70B1LQCq4Ktyn7AZrj'
      },
      data: {
        documento: documento,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error al buscar el socio:', error);
    res.status(500).json({ error: 'Error al buscar el socio' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
