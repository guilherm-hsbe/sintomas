const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./db/connection');

const app = express();
const PORT = 3000;

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Diretório público
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rotas
// ============================================================================

// Dashboard
app.get('/', (req, res) => {
    res.render('pages/dashboard');
});

// Criar síntoma
app.get('/sintoma', (req, res) => {
    res.render('pages/sintoma', { mode: 'create', sintoma: null });
});

// Editar síntoma
app.get('/sintoma/:id', (req, res) => {
    const id = req.params.id;
    const sintoma = {
        id: id,
        descricao: 'Dor de cabeça',
        localizacao: 'Cabeça',
        duracao: 1,
        intensidade: 3,
        observacoes: 'Nenhuma observação',
        data: '2025-09-07'
    };
    res.render('pages/sintoma', { mode: 'edit', sintoma: sintoma });
});

// Relatórios
app.get('/relatorios', (req, res) => {
    res.render('pages/relatorios');
});

// ============================================================================

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});