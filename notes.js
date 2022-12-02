const chalk = require('chalk')
const fs = require('fs')

const getnotes = function() {
	return 'Your notes....'
}

//typeof addNote is a function object
//in JS, functions are first class objects
const addNote = (title, body) => {
	/**
	 * 1. if the notes file exists, then load it
	 * 2 Otherwise create an empty file
	 * 3. Check if the note to be added already exists
	 * 4. If the note exists, it is a duplicate
	 * 5. If not, add it to the file
	 */
	//notes is an array of JSON objects
	const notes = loadNotes()
	//check if the note to be added already exists
	//filter returns an array of duplicates
	//for each note return true if the note already exists
	const dups = notes.filter((note) => title === note.title )

	/*
	 * if dups is empty add the note otherwise ignore the note
	 */
	if (dups.length === 0) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.blue.inverse('Note added\n'))
	}
	else {
		console.log('Duplicate title cannot be added\n')
	}
}

/**
 * Removes a note from the file if the note with the specified  title exists.
 */
const remove = (title) => {
	console.log('Removing note ' + title + '\n')
	const notes = loadNotes()

	//in case of an empty file
	if (notes.length === 0) {
		console.log(chalk.red.inverse('No note found\n'))
	}
	else {
		//return an array of notes other than the notes to be removed
		//add note to the list of notes to keep if the condition is true
		const dups = notes.filter((note) => title !== note.title ) 
		if (notes.length > dups.length) {
			console.log(chalk.green.inverse('Note removed\n'))
			saveNotes(dups)
		}
		else {
			console.log(chalk.red.inverse('No note found\n'))
		}
	}
}

/******************Internal helper functions******************************/

const loadNotes = function() {
	//notes.json shall contain JSON data
	//read the file if it exists
	try {
		//this will fail if notes.json does not exist
		const dataBuf = fs.readFileSync('notes.json') //returns binary
		//typeof dataJSON is string which contains JSON representation
		const dataJSON = dataBuf.toString() //get the file data as a string
		//create an Object from dataJSON
		return JSON.parse(dataJSON)
	}
	catch(e) {
		//return [] when notes.json does not exist
		return []
	}
}

const saveNotes = function(notes) {
	//convert the array to a JSON
	console.log(typeof(notes)) //returns object
	//object -> string containing JSON representation
	const notesJSON = JSON.stringify(notes)
	console.log(typeof(notesJSON)) //returns string
	fs.writeFileSync('notes.json', notesJSON)
}

/*
 */
module.exports = {
 	// exported function:internal function
	addNote: addNote,
	removeNote: remove
}
