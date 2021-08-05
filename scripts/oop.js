const person = {
    name: {
        first : 'Bob',
        last : 'Smith',
    },
    age: 32,
    gender: 'male',
    interests: ['music', 'skiing'],

    bio: function() {
        console.log(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');

    },

    greeting: function(){
        console.log('Hi! I\'m ' + this.name.first + '.');
    },
};

let myDataName = 'heigth';
let myDataValue = '1.85m';
person[myDataName] = myDataValue;
console.log(person.heigth);

person.age = 45;
person['name']['last'] = 'Cratchit';

person['eyes'] = 'hazel';
person.farewell = () => { console.log("Bye everybody!") };

// console.log(person['eyes'])
// person.farewell()

/* 
console.log(person.name.last)
console.log(person);
console.log(typeof person); */
/* 
console.log(person.name)
console.log(person.name['first'])
console.log(person.age)
console.log(person.interests[1])
console.log(person.name.first) */


console.log(Object.values(person));
// console.log(Object.foo(person));
console.log(Object.keys(person));