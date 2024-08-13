const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');  // Importar helmet

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Configura CSP con Helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
      defaultSrc: ["'self'"],  // Default fallback
      fontSrc: ["'self'", 'https://sportclub-pinq.onrender.com'],
      // Agrega otras directivas según sea necesario
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
