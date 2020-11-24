import { create } from 'domain';
import { createContext, addListener } from '../lib/src';

const Count = createContext(0);
const User = createContext({
  firstName: 'John',
  lastName: 'Jane',
});

setInterval(() => {
  // increment 5 times 
  Count(c => c + 1);
  Count(c => c + 1);
  Count(c => c + 1);
  Count(c => c + 1);
  Count(c => c + 1);
}, 1000);

setTimeout(() => {
  // set object attribute
  User(u => ({
    ...u,
    firstName: 'Jane',
  }))
}, 3000);

addListener(() => {
  console.log('Count: ', Count());
  console.log('User: ', User());
});


