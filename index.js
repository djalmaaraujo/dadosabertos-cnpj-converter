const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const state = process.argv[2];
const file = `data/Socios${state}.txt`;

console.log(`Initiating for ${state}...`);

if (!fs.existsSync(file)) {
  return false;
}

const instream = fs.createReadStream(file);
const outstream = new stream;
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
    input: instream,
    output: process.stdout,
    terminal: false
});

const convertedFile = `./converted/Socios${state}.txt`;
if (fs.existsSync(convertedFile)) {
  fs.unlinkSync(convertedFile);
}

fd = fs.openSync(convertedFile, 'w');

rl.on('line', (line) => {
  if (line.startsWith('02')) {
    return false;
  }

  const cnpj = line.substring(2, 16);
  const name = line.substring(16)

  fs.write(fd, `INSERT INTO companies (cnpj, name, state) VALUES (${cnpj}, '${name.trim().replace(/'/g, "''")}', '${state}');\n`);
});
