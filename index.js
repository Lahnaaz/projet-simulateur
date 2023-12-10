document.getElementById('simulateurForm').addEventListener('input', function() {
  const montant = parseFloat(document.getElementById('montant').value);
  const taux = parseFloat(document.getElementById('taux').value.replace(',', '.'));
  const année = parseFloat(document.getElementById('année').value);
  
  if (!isNaN(montant) && !isNaN(taux) && !isNaN(année)) {
    const durée = année * 12;
    const tauxMensuel = (taux / 100) / 12;
    const mensualite = (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -durée));

    let montantRestant = montant;
    let tableauEcheances = '<table border="1"><tr><th>Période</th><th>Capital amorti</th><th>Intérêts</th><th>Capital restant</th><th>Mensualité</th></tr>';

    for (let i = 1; i <= durée; i++) {
        const interetsMois = montantRestant * tauxMensuel;
        const amortissementMois = mensualite - interetsMois;
        montantRestant -= amortissementMois;

        tableauEcheances += `<tr><td>${Math.ceil(i)}</td><td>${Math.round(amortissementMois)}</td><td>${Math.round(interetsMois)}</td><td>${Math.round(montantRestant)}</td><td>${Math.round(mensualite)}</td></tr>`;
    } 

    tableauEcheances += '</table>';
    document.getElementById('resultats').innerHTML = tableauEcheances;
  }
});

