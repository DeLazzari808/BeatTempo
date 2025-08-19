const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota para todas as URLs amigáveis - redirecionar para index.html
app.get(['/servicos', '/ia', '/financas', '/producoes', '/sobre', '/orcamento'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota padrão
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('URLs disponíveis:');
    console.log('- http://localhost:3000/');
    console.log('- http://localhost:3000/servicos');
    console.log('- http://localhost:3000/producoes');
    console.log('- http://localhost:3000/sobre');
    console.log('- http://localhost:3000/orcamento');
}); 