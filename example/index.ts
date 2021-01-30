import { createContext, addListener } from '..';

const Count = createContext(0);
const User = createContext({
  firstName: 'John',
  lastName: 'Doe',
});

setInterval(() => {
  // increment 5 times 
  Count.set(Count() + 1);
  Count.set(Count() + 1);
  Count.set(Count() + 1);
  Count.set(Count() + 1);
  Count.set(Count() + 1);
}, 1000);

setTimeout(() => {
  // set object attribute
  User.merge({
    firstName: 'Jane',
  });
}, 3000);

addListener(() => {
  console.log('Count: ', Count());
  console.log('User: ', User());
});


