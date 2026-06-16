const { chromium } = require('playwright');
const fs = require('fs');

(async () => {

  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto(
    'https://resultadosegundavuelta.onpe.gob.pe/main/resumen',
    { waitUntil: 'networkidle' }
  );

  const texto = await page.evaluate(async () => {

    const r = await fetch(
      '/presentacion-backend/resumen-general/participantes?idEleccion=10&tipoFiltro=eleccion'
    );

    return await r.text();

  });

  fs.writeFileSync('debug.txt', texto);

  await browser.close();

})();
