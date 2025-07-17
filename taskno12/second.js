import { name } from './first.js'
console.log(name)
// Import first.js se
import { add, multiply } from './first.js';

// Console check
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

// HTML mein dikhado
document.body.innerHTML = `
  <h2>Easy Math Example</h2>
  <p>2 + 3 = ${add(2, 3)}</p>
  <p>2 * 3 = ${multiply(2, 3)}</p>
`;