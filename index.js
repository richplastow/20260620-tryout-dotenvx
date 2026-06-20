// index.js
require('@dotenvx/dotenvx').config()
// or import '@dotenvx/dotenvx/config' // for esm

console.log(`Hello ${process.env.HELLO}`)