const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

db.serialize(() => {
  // Tabelas
  // ============================================================================

  // categorias
  db.run(`
    CREATE TABLE IF NOT EXISTS categoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL UNIQUE
    )
  `);

  // localizações
  db.run(`
    CREATE TABLE IF NOT EXISTS localizacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL UNIQUE
    )
  `);

  // sintomas
  db.run(`
    CREATE TABLE IF NOT EXISTS sintoma (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      duracao INTEGER,
      intensidade INTEGER,
      observacoes TEXT,
      data TEXT NOT NULL,
      categoria_id INTEGER,
      localizacao_id INTEGER,
      FOREIGN KEY(categoria_id) REFERENCES categoria(id),
      FOREIGN KEY(localizacao_id) REFERENCES localizacao(id)
    )
  `);

  // Predefinições
  // ============================================================================

  const localizacoes = [
    'Cabeça',
    'Face',
    'Pescoço',
    'Ombro',
    'Braço',
    'Cotovelo',
    'Antebraço',
    'Punho',
    'Mão',
    'Tórax',
    'Costas',
    'Abdomên',
    'Quadril',
    'Coxa',
    'Joelho',
    'Perna',
    'Tornozelo',
    'Pé',
    'Pele',
    'Sistema Geral'
  ];

  localizacoes.forEach(nome => {
    db.run(`INSERT OR IGNORE INTO localizacao (nome) VALUES (?)`, [nome]);
  });

  const categorias = [
    'Dor',
    'Febre',
    'Inflamação',
    'Náusea / Vômito',
    'Tontura / Vertigem',
    'Cansaço / Fadiga',
    'Alteração da Pele (manchas, coceira, erupções)',
    'Alteração Respiratória (tosse, falta de ar)',
    'Alteração Cardiovascular (palpitação, pressão)',
    'Alteração Gastrointestinal (diarreia, prisão de ventre)',
    'Alteração Neurológica (formigamento, perda de força, convulsão)',
    'Alteração Psicológica (ansiedade, insônia, confusão mental)'
  ];

  categorias.forEach(nome => {
    db.run(`INSERT OR IGNORE INTO categoria (nome) VALUES (?)`, [nome]);
  });
});

module.exports = db;
