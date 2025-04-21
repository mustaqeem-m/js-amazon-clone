import { currencyFormatter } from '../Scripts/utils/money.js';


console.log('basic currency formatter test case: 12345 -> 123.45, 1234567890 -> 1,234,')
if (currencyFormatter(12345) === '123.45') {
    console.log('Test passed');
  } else {
    console.log('Test failed');
}
  console.log('it should handle decimal numbers correctly: 12345.6789 -> 1,234,567.89, 2000.4 ->')
if (currencyFormatter(1234567890) === '1,234,567.89') {
    console.log('Test passed');
  } else {
    console.log('Test failed');
    console.log(`expercted output: 1,234,567.89 but got: ${currencyFormatter(1234567890)}`)
}
  console.log('it should handle numbers with leading zeros correctly: 00012345 -> 1,234,5')
if (currencyFormatter(2000.4) === '2000.40') {
    console.log('Test passed');
} else {
    console.log('Test failed');
    console.log(`expercted output: 2000.40 but got: ${currencyFormatter(2000.4)}`)
}