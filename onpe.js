const { chromium } = require('playwright');
const fs = require('fs');

(async () => {

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    'https://resultadosegundavuelta.onpe.gob.pe/main/resumen',
    {
      waitUntil: 'networkidle'
    }
  );

  const participantes = await page.evaluate(async () => {

    const r = await fetch(
      '/presentacion-backend/resumen-general/participantes?idEleccion=10&tipoFiltro=eleccion'
    );

    return await r.json();

  });

  const totales = await page.evaluate(async () => {

    const r = await fetch(
      '/presentacion-backend/resumen-general/totales?idEleccion=10&tipoFiltro=eleccion'
    );

    return await r.json();

  });

  const salida = {
    actualizado: new Date().toISOString(),
    participantes,
    totales
  };

  fs.writeFileSync(
    'resultados.json',
    JSON.stringify(salida, null, 2)
  );

  await browser.close();

})();
