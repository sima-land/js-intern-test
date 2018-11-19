const ancientToModern = require('./app')

for (let i = 0; i < 80; i++) {
  console.log(`${i}: [${ancientToModern(i)}]`)
}