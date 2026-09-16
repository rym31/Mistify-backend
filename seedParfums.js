/**
 * Script de seed unique: familles olfactives + parfums.
 * Ecrit directement dans db.sqlite (pas d'appel HTTP, pas besoin d'etre connecte).
 *
 * Robustesse:
 * - Si un parfum existe deja (meme name + brand), il est ignore (pas de doublon, pas de crash).
 * - Si une table ou une colonne attendue n'existe plus (schema qui a change), la ligne
 *   concernee est ignoree avec un avertissement au lieu de faire planter tout le script.
 *
 * Usage: node seedParfums.js
 */
const sqlite3 = require('sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.sqlite');

const familles = [
  { name: 'hesperidee' },
  { name: 'florale' },
  { name: 'fougere' },
  { name: 'chypree' },
  { name: 'boisee' },
  { name: 'orientale' },
  { name: 'aromatique' },
];

const parfums = [
  { name: 'Sauvage ', brand: 'Dior', description: 'Parfum classique', famille: 'aromatique', rating: 4, volume: 100, price: 99, gender: 'Homme', year: 2015, disponibility: true, imageUrl: '/images/dior-sauvage.jpg' },
  { name: 'No. 5', brand: 'Chanel', description: 'Parfum classique intemporel', famille: 'florale', rating: 4, volume: 100, price: 145, gender: 'Femme', year: 1921, disponibility: true, imageUrl: '/images/chanel-no5.jpg' },
  { name: 'Bleu de Chanel', brand: 'Chanel', description: 'Parfum elegant et masculin', famille: 'aromatique', rating: 4, volume: 100, price: 130, gender: 'Homme', year: 2010, disponibility: true, imageUrl: '/images/chanel-bleu.jpg' },
  { name: 'One', brand: 'Calvin Klein', description: 'Eau fraiche et sensuelle', famille: 'hesperidee', rating: 4, volume: 100, price: 70, gender: 'Unisexe', year: 1994, disponibility: true, imageUrl: '/images/calvin-klein-one.jpg' },
  { name: 'Aventus', brand: 'Creed', description: 'Parfum luxe et sophistique', famille: 'chypree', rating: 4, volume: 75, price: 350, gender: 'Homme', year: 2010, disponibility: true, imageUrl: '/images/creed-aventus.jpg' },
  { name: 'La Nuit', brand: 'Yves Saint Laurent', description: 'Parfum oriental seducteur', famille: 'orientale', rating: 4, volume: 90, price: 95, gender: 'Femme', year: 1985, disponibility: true, imageUrl: '/images/ysl-lanuit.jpg' },
  { name: "Eau d'Issey", brand: 'Issey Miyake', description: 'Parfum floral et frais', famille: 'hesperidee', rating: 4, volume: 100, price: 85, gender: 'Femme', year: 1992, disponibility: true, imageUrl: '/images/issey-miyake.jpg' },
  { name: 'Polo', brand: 'Ralph Lauren', description: 'Parfum sportif classique', famille: 'fougere', rating: 4, volume: 100, price: 80, gender: 'Homme', year: 1978, disponibility: true, imageUrl: '/images/polo-ralph.jpg' },
  { name: 'Beautiful', brand: 'Estee Lauder', description: 'Parfum floral elegant', famille: 'florale', rating: 4, volume: 100, price: 110, gender: 'Femme', year: 1985, disponibility: true, imageUrl: '/images/estee-beautiful.jpg' },
  { name: 'Gentleman', brand: 'Givenchy', description: 'Parfum boise raffine', famille: 'orientale', rating: 4, volume: 100, price: 95, gender: 'Homme', year: 1974, disponibility: true, imageUrl: '/images/givenchy-gentleman.jpg' },
  { name: 'Eros', brand: 'Versace', description: 'Parfum fruité seducteur', famille: 'orientale', rating: 4, volume: 100, price: 90, gender: 'Homme', year: 2012, disponibility: true, imageUrl: '/images/versace-eros.jpg' },
  { name: '1 Million', brand: 'Paco Rabanne', description: 'Parfum dore et sensuel', famille: 'orientale', rating: 4, volume: 100, price: 85, gender: 'Homme', year: 2008, disponibility: true, imageUrl: '/images/paco-1million.jpg' },
  { name: 'Le Male', brand: 'Jean Paul Gaultier', description: 'Parfum gourmand sucre', famille: 'orientale', rating: 4, volume: 125, price: 75, gender: 'Homme', year: 1994, disponibility: true, imageUrl: '/images/jpg-lemale.jpg' },
  { name: 'The One', brand: 'Dolce & Gabbana', description: 'Parfum ambre epice', famille: 'florale', rating: 4, volume: 75, price: 80, gender: 'Femme', year: 1994, disponibility: true, imageUrl: '/images/dg-theone.jpg' },
  { name: 'Stronger with You', brand: 'Armani', description: 'Parfum frais et moderne', famille: 'orientale', rating: 4, volume: 100, price: 95, gender: 'Homme', year: 2017, disponibility: true, imageUrl: '/images/armani-stronger.jpg' },
  { name: 'La Vie Est Belle', brand: 'Lancome', description: 'Parfum floral sucre', famille: 'florale', rating: 4, volume: 75, price: 105, gender: 'Femme', year: 2012, disponibility: true, imageUrl: '/images/lancome-lavie.jpg' },
  { name: 'Daisy', brand: 'Marc Jacobs', description: 'Parfum floral jovial', famille: 'florale', rating: 4, volume: 100, price: 75, gender: 'Femme', year: 2007, disponibility: true, imageUrl: '/images/marc-daisy.jpg' },
  { name: 'Shalimar', brand: 'Guerlain', description: 'Parfum oriental mythique', famille: 'florale', rating: 4, volume: 90, price: 130, gender: 'Femme', year: 1925, disponibility: true, imageUrl: '/images/guerlain-shalimar.jpg' },
  { name: 'Coco', brand: 'Chanel', description: 'Parfum floral ambre', famille: 'florale', rating: 4, volume: 100, price: 130, gender: 'Femme', year: 1984, disponibility: false, imageUrl: '/images/chanel-coco.jpg' },
  { name: 'Black Orchid', brand: 'Tom Ford', description: 'Parfum floral noir', famille: 'orientale', rating: 4, volume: 50, price: 165, gender: 'Femme', year: 2006, disponibility: true, imageUrl: '/images/tomford-blackorchid.jpg' },
  { name: 'Blu Mediterraneo', brand: 'Acqua di Parma', description: 'Eau fraiche marine', famille: 'hesperidee', rating: 4, volume: 150, price: 110, gender: 'Unisexe', year: 2014, disponibility: true, imageUrl: '/images/acqua-blu.jpg' },
  { name: "Terre d'Hermes", brand: 'Hermes', description: 'Parfum boise noble', famille: 'boisee', rating: 4, volume: 75, price: 125, gender: 'Homme', year: 2006, disponibility: true, imageUrl: '/images/hermes-terre.jpg' },
  { name: 'Eau de Chloe', brand: 'Chloe', description: 'Parfum floral leger', famille: 'florale', rating: 4, volume: 75, price: 100, gender: 'Femme', year: 2011, disponibility: true, imageUrl: '/images/chloe-eau.jpg' },
  { name: 'Brit', brand: 'Burberry', description: 'Parfum fruité intense', famille: 'florale', rating: 4, volume: 100, price: 90, gender: 'Femme', year: 2004, disponibility: true, imageUrl: '/images/burberry-brit.jpg' },
  { name: 'Boss Bottled', brand: 'Hugo Boss', description: 'Parfum boise masculin', famille: 'boisee', rating: 4, volume: 100, price: 85, gender: 'Homme', year: 1994, disponibility: true, imageUrl: '/images/hugo-bottled.jpg' },
  { name: 'Light Blue', brand: 'Dolce & Gabbana', description: 'Eau fraiche mediterraneenne', famille: 'florale', rating: 4, volume: 100, price: 85, gender: 'Femme', year: 2001, disponibility: true, imageUrl: '/images/dg-lightblue.jpg' },
  { name: 'Rihanna', brand: 'Fenty Beauty', description: 'Parfum oriental sucre', famille: 'florale', rating: 4, volume: 100, price: 75, gender: 'Femme', year: 2013, disponibility: true, imageUrl: '/images/rihanna-fenty.jpg' },
  { name: 'Green Tea', brand: 'Elizabeth Arden', description: 'Eau fraiche verte', famille: 'florale', rating: 4, volume: 100, price: 60, gender: 'Femme', year: 1999, disponibility: true, imageUrl: '/images/arden-greentea.jpg' },
  { name: 'Curious', brand: 'Britney Spears', description: 'Parfum fruité populaire', famille: 'florale', rating: 4, volume: 100, price: 55, gender: 'Femme', year: 2004, disponibility: false, imageUrl: '/images/britney-curious.jpg' },
  { name: 'Bare Vanilla', brand: "Victoria's Secret", description: 'Parfum gourmand vanille', famille: 'florale', rating: 4, volume: 75, price: 50, gender: 'Femme', year: 2005, disponibility: true, imageUrl: '/images/vs-vanilla.jpg' },
  { name: 'Le noir', brand: 'Calvin Klein', description: null, famille: 'boisee', rating: null, volume: 50, price: 200, gender: 'man', year: null, disponibility: null, imageUrl: null },
  { name: 'Peace', brand: 'Clavin Klien', description: null, famille: 'florale', rating: null, volume: null, price: null, gender: 'woman', year: null, disponibility: null, imageUrl: null },
];

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function tableExists(db, table) {
  const rows = await all(db, "SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [table]);
  return rows.length > 0;
}

async function getColumns(db, table) {
  const rows = await all(db, `PRAGMA table_info(${table})`);
  return new Set(rows.map((row) => row.name));
}

async function seedFamilles(db) {
  if (!(await tableExists(db, 'famille_olfactives'))) {
    console.warn("Table 'famille_olfactives' introuvable (schema modifie ?) - familles non seedees.");
    return new Map();
  }

  for (const famille of familles) {
    try {
      const existing = await all(db, 'SELECT id FROM famille_olfactives WHERE name = ?', [famille.name]);
      if (existing.length > 0) continue;
      await run(db, 'INSERT INTO famille_olfactives (name) VALUES (?)', [famille.name]);
    } catch (err) {
      console.warn(`Famille "${famille.name}" ignoree: ${err.message}`);
    }
  }

  const rows = await all(db, 'SELECT id, name FROM famille_olfactives');
  return new Map(rows.map((row) => [row.name, row.id]));
}

async function seedParfums(db, familleIdByName) {
  if (!(await tableExists(db, 'parfum'))) {
    console.warn("Table 'parfum' introuvable (schema modifie ?) - parfums non seedes.");
    return;
  }

  const availableColumns = await getColumns(db, 'parfum');
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const parfum of parfums) {
    try {
      const existing = await all(db, 'SELECT id FROM parfum WHERE name = ? AND brand = ?', [parfum.name, parfum.brand]);
      if (existing.length > 0) {
        skipped++;
        continue;
      }

      const candidate = {
        name: parfum.name,
        brand: parfum.brand,
        description: parfum.description,
        imageUrl: parfum.imageUrl,
        price: parfum.price,
        gender: parfum.gender,
        year: parfum.year,
        familleId: familleIdByName.get(parfum.famille) ?? null,
        rating: parfum.rating,
        volume: parfum.volume,
        disponibility: parfum.disponibility === null ? null : parfum.disponibility ? 1 : 0,
      };

      const columns = Object.keys(candidate).filter((col) => availableColumns.has(col));
      if (columns.length === 0) {
        console.warn(`Parfum "${parfum.name}": aucune colonne connue disponible, ignore.`);
        failed++;
        continue;
      }

      const placeholders = columns.map(() => '?').join(', ');
      const values = columns.map((col) => candidate[col]);
      await run(db, `INSERT INTO parfum (${columns.join(', ')}) VALUES (${placeholders})`, values);
      created++;
    } catch (err) {
      console.warn(`Parfum "${parfum.name}" ignore: ${err.message}`);
      failed++;
    }
  }

  console.log(`Parfums: ${created} crees, ${skipped} deja existants, ${failed} ignores.`);
}

async function seed() {
  const db = new sqlite3.Database(DB_PATH);
  try {
    const familleIdByName = await seedFamilles(db);
    console.log(`Familles olfactives: ${familleIdByName.size} disponibles.`);
    await seedParfums(db, familleIdByName);
  } catch (err) {
    console.error('Le seed a rencontre une erreur inattendue (aucune modification supplementaire):', err.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}

seed();
