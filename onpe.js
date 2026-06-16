const fs = require('fs');

fs.writeFileSync(
  'resultados.json',
  JSON.stringify({
    fecha: new Date().toISOString(),
    prueba: 'ok'
  }, null, 2)
);

console.log('ARCHIVO CREADO');
