List.js
=======

A javascript array extension lib

*Demo*

```javascript
// Create a new empty list
var list = new List();

// Create a new list based on an array
var arr = [ 1, 2, 3 ];
var list = new List(arr);

// Add a value to a list
var list = new List();
list.add('a');

// Add multiple values to a list
var list = new List();
list.addMany([ 'd', 'e', 'f' ]);

// Clear all values in a list
var list = new List([ 'alpha', 'beta', 'charlie' ]);
list.clear();

// Clone a list
var list = new List([ 'red', 'orange', 'yellow' ]);
var list2 = list.clone();
list2.addMany(['green', 'blue', 'indigo', 'violet']);
/*
=> result:
list = [ 'red', 'orange', 'yellow' ]
list2 = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ]
*/

// Check if the list contains a certain value
var list = new List([ 'red', 'green', 'blue' ]);
list.contains('green'); // => returns true
list.contains('black'); // => returns false

// Check how many values there are in the list
var list = new List([ 'warrior', 'wizard', 'rogue', 'cleric' ]);
list.count(); // => returns 4

// Find a matching value in a list
var numbers = [1,2,3,4,5,6,7,8,9];
var list = new List(numbers);
list.find(function(num) { return num < 5; }); // => returns: 1

// Find the last matching value in a list
var numbers = [1,2,3,4,5,6,7,8,9];
var list = new List(numbers);
list.findLast(function(num) { return num < 5; }); // => returns: 4

// Find all matching values in a list
var numbers = [1,2,3,4,5,6,7,8,9];
var list = new List(numbers);
list.findAll(function(num) { return num < 5; }); // => returns: 1, 2, 3, 4

// Find all matching values in a list of objects
var positions = [{ x: 10, y: 20 }, { x: 22, y: 12 }, { x: 10, y: 33 }];
var list = new List(positions);
list.findAll(function(pos) { return pos.x === 10; }); // => returns: { x: 10, y: 20 }, { x: 10, y: 33 }

// Get the first value in the list
var list = new List( [ 'Luke', 'Leia', 'Han', 'Chewbacca' ] );
list.first(); // => returns: 'Luke'

// Get the last value in the list
var last = new List( [ 'Link', 'Zelda', 'Gannon' ] );
list.last(); // => returns: 'Gannon'

// Loop each value in the list
var list = new List( [ 'Gamma', 'Helm', 'Johnson', 'Vlissides' ] );
list.forEach(function(value, index, list) {
	console.log('The value at index ' + index + ' is ' + value);
});
/* 
=> result:
The value at index 0 is Gamma
The value at index 1 is Helm
The value at index 2 is Johnson
The value at index 3 is Vlissides
*/

// Get value at a certain index
var list = new List( [ 'Angular', 'Knockout', 'Ember', 'Backbone' ] );
list.get(2); // => returns: Ember

// Get every X value from a list
var list = new List( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
list.getNth(0, 2); // => result: 1, 3, 5, 7, 9
list.getNth(1, 2); // => result: 2, 4, 6, 8
list.getNth(2, 3); // => result: 3, 6, 9

// Get index of a value
var list = new List( [ 'fire', 'ice', 'earth', 'wind' ] );
list.indexOf('ice'); // => returns: 1

// Get the last index of a value
var list = new List( [ 0, 1, 1, 0, 1, 0, 0, 1, 0 ] );
list.lastIndexOf(1); // => returns: 7

// Insert value to a list
var list = new List( [ 'Ale', 'Lager', 'Pilsner' ] );
list.insert('Stout', 1); // => result: Ale, Stout, Lager, Pilsner

list.insert('Porter'); // => result: Porter, Ale, Stout, Lager, Pilsner

// Insert multiple values to a list
var list = new List( [ 'Futura', 'Helvetica', 'Franklin' ] );
list.insertMany([ 'Gotham', 'Univers', 'DIN' ], 1); // => result: Futura, Gotham, Univers, DIN, Helvetica, Franklin

// Get a certain range of values from a list
var list = new List( [ 1, 2, 3, 4, 5, 6 ] );
list.range(2,2); // => result: 3, 4

// Remove a value from a list
var list = new List( [ 'Vampire', 'Verewolf', 'Zombie', 'Mutant' ] );
list.remove('Zombie'); // => result: 'Vampire', 'Verewolf', 'Mutant'

// Remove multiple values from a list
var list = new List( [ 'ThunderCats', 'Transformers', 'Robotech', 'G-Force', 'M.A.S.K.' ] );
list.removeMany([ 'Transformers', 'M.A.S.K.' ]); // => result: 'ThunderCats', 'Robotech', 'G-Force'

// Remove a range of values from a list
var list = new List( [ 'spider', 'bat', 'snake', 'wasp' ] );
list.removeRange(1,2); // => result: 'spider', 'wasp'

// Set the value of a certain index in the list
var list = new List( ['kyle', 'kenny', 'stan'] );
list.set(1, 'cartman'); // => result: 'kyle', 'cartman', 'stan'

// Skip values in a list
var list = new List( [ 1, 2, 3, 4, 5 ] );
list.skip(3); // => result: 4, 5

// Split values in a list
var list = new List( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );
var list2 = new List( [ 'a', 'b', 'c', 'd' ] );
list.split(3); // => result: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [10] ]
list2.split(2); // => result: [ [ 'a', 'b' ], [ 'c', 'd' ] ]

// Split values in a list into columns
var list = new List( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );
var list2 = new List( [ 'a', 'b', 'c', 'd' ] );

list.splitColumns(4); 
/* => result: 	
[ 1, 2, 3 ], 
[ 4, 5, 6 ], 
[ 7, 8 ],
[ 9, 10]  
*/

list2.splitColumns(2); // => result: [ 'a', 'b' ], [ 'c', 'd' ]

// Take values in a list
var list = new List( [ 1, 2, 3, 4, 5 ] );
list.take(3); // => result: 1, 2, 3

// Get all unique values in a list
var list = new List([1, 2, 3, 2, 1]);
list.unique(); // => returns: 1, 2, 3

// Chaining... TODO
```