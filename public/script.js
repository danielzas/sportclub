document.getElementById('buscar').addEventListener('click', async () => {
    const documento = document.getElementById('documento').value;
  
    if (!documento) {
      alert('Por favor, ingresa un documento.');
      return;
    }
  
    try {
      const response = await axios.post('https://sportclub-pinq.onrender.com/buscar-socio', {
        documento: documento,
      });
  
      const data = response.data;
      console.log(data);
      displayResult(data);
    } catch (error) {
      console.error('Error al buscar el socio:', error);
      alert('Hubo un error al buscar el socio. Por favor, intenta de nuevo.');
    }
  });
  
  function displayResult(data) {
    const resultDiv = document.getElementById('result');
    if(data.Response)
    {
      console.log('Socio Válido');
      estado='<p style="color:green;font-size:30px;"><strong>Socio Válido</strong></p>';
    }else{
      console.log('Socio Inexistente');
      estado='<p style="color:red;font-size:30px;"><strong>Socio Inexistente</strong></p>';
    }
    resultDiv.innerHTML = `
      <h3>Información del Socio</h3>${estado};
    `;
  }
  
