/*
 * List.js - v0.3 - 2014-12-01
 * Created by Andreas Nylin
 * andreas.nylin@gmail.com / @andreasnylin / andreasnylin.com
 */
var List = function(list) {

	list = list || [];

	this.list = list;
};

List.prototype.add = function(obj) {
	this.list.push(obj);
	
	return this;
};

List.prototype.addMany = function(objs) {
	this.list = this.list.concat(objs);
	
	return this;
};

List.prototype.clear = function() {
    this.list = [];
	
	return this;
};

List.prototype.clone = function() {
	return new List(this.list.slice(0));
};

List.prototype.compareObj = function(obj1, obj2) {
	// TODO
	console.warn('List does not support Objects.');
	
	throw 'compareObj() is not implemented yet';
	
	return null;
};

List.prototype.contains = function(obj) {
	return this.indexOf(obj) !== -1;
};

List.prototype.count = function() {
    return this.list.length;
};

List.prototype.equals = function(other) {
	if (!other.list) {
		return false;
	}

	if (this.list.length != other.list.length) {
		return false;
	}

	for (var i = 0, l = this.list.length; i < l; i++) {
		var thisValue = this.list[i],
			otherValue = other.list[i];

		// Does not support objects
		if(typeof thisValue === 'object' || typeof otherValue === 'object') {
			console.warn('List does not support Objects.');
			return false;
		}

		if (thisValue instanceof Array && otherValue instanceof Array) {
			if (!thisValue.equals(otherValue)) {
				return false;
			}
		}
		else if (thisValue != otherValue) {
			return false;
		}       
	}

	return true;
};

List.prototype.find = function(func) {
	var i,
		l,
		item,
		list = new List();
 
	for(i = 0, l = this.list.length; i < l; i++) {
		item = this.list[i];

		if(func.call(this.list, item)) {
			return item;
		}
	}

	return null;
};

List.prototype.findAll = function(func) {
	var i,
		l,
		item,
		part = [];
 
	for(i = 0, l = this.list.length; i < l; i++) {
		item = this.list[i];

		if(func.call(this.list, item)) {
			part.push(item);
		}
	}

	return new List(part);
};

List.prototype.findLast = function(func) {
	var i,
		item,
		part = [];
 
	for(i = this.list.length - 1; i >= 0; i--) {
		item = this.list[i];

		if(func.call(this.list, item)) {
			return item;
		}
	}

	return null;
};

List.prototype.first = function() {
    return this.list.length > 0 ? this.list[0] : null;
};

List.prototype.forEach = function(func, thisElement) {
	if(!Array.prototype.forEach) {
        var i, l;
		
        thisElement = thisElement || this.list;
 
        for(i = 0, l = this.list.length; i < l; i++) {
            func.call(thisElement, this.list[i], i, this);
        }
	}
	else {
		this.list.forEach(func, thisElement);
	}
	
	return this;
};

List.prototype.get = function(i) {
	var value = null;
	
	if(i < this.list.length) {
		value = this.list[i];
	}
	
	return value;
};

List.prototype.getAll = function() {	
	return this.list;
};

List.prototype.getNth = function(startIndex, cycleSize) {
	var i,
		l,
		list = new List();
	
	for (i = startIndex, l = this.list.length; i < l; i += cycleSize) {
		list.add(this.list[i]);
	}

	return list;
};

List.prototype.indexOf = function(obj) {
	var pointer = -1;
	
	// TODO: Needs to handle objects
	if(!Array.prototype.indexOf) {
		var i, l;
 
		for(i = 0, l = this.list.length; i < l; i++) {
			if(obj === this.list[i]) {
				pointer = i;
			}
		}
		
	}
	else {
		pointer = this.list.indexOf(obj)
	}
	
	return pointer;
};

List.prototype.insert = function(obj, i) {
	if(!Array.prototype.insert) {
        i = i || 0;
        this.list.splice(i, 0, obj);
	}
	else {
		this.list.insert(obj, i);
	}
	
	return this;
};

List.prototype.insertMany = function(objs, i) {
	i = i || 0;
	
	Array.prototype.splice.apply(this.list, [i, 0].concat(objs));
	
	return this;
};

List.prototype.last = function() {
    var length = this.list.length;

    return length > 0 ? this.list[length - 1] : null;
};

List.prototype.lastIndexOf = function(obj) {
	var pointer = -1;
	
	// TODO: Needs to handle objects
	if(!Array.prototype.lastIndexOf) {
		var i;

		for(i = this.list.length; i <= 0; i--) {
			if(obj === this.list[i]) {
				pointer = i;
			}
		}

		return -1;
	}
	else {
		pointer = this.list.lastIndexOf(obj);
	}

	return pointer;
};

List.prototype.range = function(i, count) {
	var part = this.list.slice(i, i + count);
	
	return new List(part);
};

List.prototype.remove = function(obj) {
	if(!Array.prototype.remove) {
		var i = this.indexOf(obj);
 
		if(i >= 0) {
			this.list.splice(i, 1);
		}		
	}
	else {
		return this.list.remove(obj);
	}
	
	return this;
};

List.prototype.removeMany = function(objs) {
	var i;
	
	for(i = objs.length - 1; i >= 0; i--) {
		this.remove(objs[i]);
	}
	
	return this;
};

List.prototype.removeRange = function(i, count) {
	this.list.splice(i, count);
	
	return this;
};

List.prototype.set = function(i, value) {
    if(this.list.length > i) {
		this.list[i] = value;
	}

    return this;
};

List.prototype.skip = function(count) {
    var part,
        length = this.list.length;

    if(length > count) {
        part = this.list.slice(count);
    } else {
        part = [];
    }

    return new List(part);
};

List.prototype.split = function(count) {
    var i = 0,
    	l = this.list.length,
    	parts = new List();

    while(i < l) {
    	parts.add(this.skip(i).take(count));
    	i += count;
    }

    return parts;
};

List.prototype.splitColumns = function(parts) {
    var list = new List(),
		defaultSize = Math.floor(this.list.length / parts),
		offset = this.list.length % parts,
		position = 0,
		i,
		size;

    for (i = 0; i < parts; i++) {
		size = defaultSize;

		if (i < offset) {
		    size++; // Just add one to the size (it's enough).
		}

		list.add(this.range(position, size));

		// Set the new position after creating a part list, so that it always start with position zero on the first yield return above.
		position += size;
    }

    return list;
};

List.prototype.take = function(count) {
    var part,
		length = this.list.length;

    if(count > length) {
        count = length;
    }
	
	part = this.list.slice(0, count);

    return new List(part);
};

List.prototype.unique = function() {
	// TODO: what about objects?
	var i,
		l,
		parts = new List(),
		value;
	
	for(i = 0, l = this.list.length; i < l; i++){
		value = this.list[i];
		
		if(!parts.contains(value)) {
			parts.add(value);
		}
	}
		
	return parts;
};
