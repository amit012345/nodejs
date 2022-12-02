//validator is an npm package
const validator = require('validator')
const chalk = require('chalk')
//for parsing command line parameters
const yargs = require('yargs')
const notes = require('./notes.js')
	
//const n = notes()
//console.log(chalk.blue(n))

console.log(validator.isEmail('amit@gmail.com'))
console.log(validator.isURL('https://www.gmail.com'))

//print all the command line parameters passed to the app
//console.log(process.argv)

/*
console.log(process.argv[2])
const command = process.argv[2]
*/

//=== is equal value and type
/*
if (command === 'add') {
	console.log('Adding note.....')
}
*/

yargs.version('1.1.0')

yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		//--title
		title: {
			describe: 'Note title',
			demandOption: true, //title is required
			type: 'string' //without this, type will be boolean
		},
		//--body
		body: {
			describe: 'Note body',
			//demandOption: true, //title is required
			type: 'string' //without this, type will be boolean
		}
	},
	handler: function(argv) {
		notes.addNote(argv.title, argv.body)
		//console.log('Title:' +  argv.title)
		//console.log('Body:' +  argv.body)
	}
})

yargs.command({
	command: 'remove',
	describe: 'Remove a new note',
	handler: function(argv) {
		notes.removeNote(argv.title)
		//console.log('Removing a note')
	},
	builder: {
		//--title
		title: {
			describe: 'Note title',
			demandOption: true, //title is required
			type: 'string' //without this, type will be boolean
		}
	}
})

yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler: function() {
		console.log('Listing notes')
	}
})

yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function() {
		console.log('Read a note')
	}
})

yargs.parse()
//console.log(yargs.argv)
