const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

// Params
const state = process.argv[2];
const format = process.argv[3];

const stateSourceFile = `data/Socios${state}.txt`;

let ext = '.sql';
let dataFormat = 'sql';

if (format === 'csv') {
  ext = '.csv';
  dataFormat = format;
}

if (!fs.existsSync(stateSourceFile)) {
  return false;
}

const instream = fs.createReadStream(stateSourceFile);
const outstream = new stream;
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
    input: instream,
    output: process.stdout,
    terminal: false
});

const convertedFile = `./converted/${state}${ext}`;
if (fs.existsSync(convertedFile)) {
  fs.unlinkSync(convertedFile);
}

fd = fs.openSync(convertedFile, 'w');

// Add headers
if (dataFormat === 'csv') {
  fs.write(fd, 'CNPJ,NAME,STATE\n');
}

rl.on('line', (line) => {
  if (line.startsWith('02')) {
    return false;
  }

  const cnpj = line.substring(2, 16);
  let name = line.substring(16).trim();

  // For SQL, every single quote becomes 2. For csv, no comma is allowed
  if (dataFormat === 'csv') {
    name = name.replace(/,/g, " ");
  } else {
    name = name.replace(/'/g, "''");
  }

  if (dataFormat === 'csv') {
    fs.write(fd, `${cnpj},${name},${state}\n`);
  } else {
    fs.write(fd, `INSERT INTO companies (cnpj, name, state) VALUES (${cnpj}, '${name}', '${state}');\n`);
  }
});
