import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./db.db');

const dummyData = [{
    id: 0,
    title: 'Football Game',
    description: 'Very interesting game open the season on italian league',
    date: '22/04/2024',
    organizer: 'FIFA',
},
{
    id: 1,
    title: 'Basketball Game',
    description: 'Very interesting game open the season on brazilian league',
    date: '23/04/2024',
    organizer: 'NBA',
},
{
    id: 2,
    title: 'Voleyball Game',
    description: 'Very interesting game open the season on spanish league',
    date: '24/04/2024',
    organizer: 'VOLA',
},
{
    id: 3,
    title: 'Opera',
    description: 'The best opera singers have come from all over the world to amaze you with their voices.',
    date: '25/04/2024',
    organizer: 'Music Sound',
},
{
    id: 4,
    title: 'Movie',
    description: 'New film starring Hugh Jackman and Rayon Reynolds',
    date: '26/04/2024',
    organizer: 'MaxFilm',
},
{
    id: 5,
    title: 'Baseball Game',
    description: 'Very interesting game open the season on american league',
    date: '30/04/2024',
    organizer: 'BASE',
},
{
    id: 6,
    title: 'Golden boy',
    description: 'World s best young player award ceremony',
    date: '02/05/2024',
    organizer: 'FIFA',
},
{
    id: 7,
    title: 'Music festival',
    description: 'The best DJs from all over the world have come to delight you with their music',
    date: '04/05/2024',
    organizer: 'Europa plus',
},
{
    id: 8,
    title: 'Kricket Game',
    description: 'Very interesting game open the season on english league',
    date: '10/05/2024',
    organizer: 'KIRA',
},
{
    id: 9,
    title: 'Golden ball',
    description: 'Award ceremony for the best football player in the world',
    date: '12/05/2024',
    organizer: 'FIFA',
},
{
    id: 10,
    title: 'Theater',
    description: 'A new play from a famous theatre company',
    date: '14/05/2024',
    organizer: 'World Theatre',
},
{
    id: 11,
    title: 'Tennis Game',
    description: 'Very interesting game open the season on world league',
    date: '15/05/2024',
    organizer: 'TEFE',
},
{
    id: 12,
    title: 'Theater 2',
    description: 'A new play from a famous theatre company',
    date: '14/05/2024',
    organizer: 'World Theatre',
},
{
    id: 13,
    title: 'Tennis Game 2',
    description: 'Very interesting game open the season on world league',
    date: '15/05/2024',
    organizer: 'TEFE',
},
{
    id: 14,
    title: 'Football Game 2',
    description: 'Very interesting game open the season on italian league',
    date: '22/04/2024',
    organizer: 'FIFA',
},
{
    id: 15,
    title: 'Basketball Game 2',
    description: 'Very interesting game open the season on brazilian league',
    date: '23/04/2024',
    organizer: 'NBA',
},
{
    id: 16,
    title: 'Voleyball Game 2',
    description: 'Very interesting game open the season on spanish league',
    date: '24/04/2024',
    organizer: 'VOLA',
},
{
    id: 17,
    title: 'Opera 2',
    description: 'The best opera singers have come from all over the world to amaze you with their voices.',
    date: '25/04/2024',
    organizer: 'Music Sound',
},
{
    id: 18,
    title: 'Movie 2',
    description: 'New film starring Hugh Jackman and Rayon Reynolds',
    date: '26/04/2024',
    organizer: 'MaxFilm',
},
{
    id: 19,
    title: 'Baseball Game 2',
    description: 'Very interesting game open the season on american league',
    date: '30/04/2024',
    organizer: 'BASE',
},
{
    id: 20,
    title: 'Golden boy 2',
    description: 'World s best young player award ceremony',
    date: '02/05/2024',
    organizer: 'FIFA',
},
{
    id: 21,
    title: 'Music festival 2',
    description: 'The best DJs from all over the world have come to delight you with their music',
    date: '04/05/2024',
    organizer: 'Europa plus',
},
{
    id: 22,
    title: 'Kricket Game 2',
    description: 'Very interesting game open the season on english league',
    date: '10/05/2024',
    organizer: 'KIRA',
},
{
    id: 23,
    title: 'Golden ball 2',
    description: 'Award ceremony for the best football player in the world',
    date: '12/05/2024',
    organizer: 'FIFA',
},
{
    id: 24,
    title: 'Theater 3',
    description: 'A new play from a famous theatre company',
    date: '14/05/2024',
    organizer: 'World Theatre',
},
{
    id: 25,
    title: 'Tennis Game 3',
    description: 'Very interesting game open the season on world league',
    date: '15/05/2024',
    organizer: 'TEFE',
},];


const userTableQuery = `CREATE  TABLE IF NOT EXISTS Persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255),
    email varchar(255),
    bDate varchar(255),
    reference varchar(255)
);`

const eventsTableQuery = `CREATE TABLE IF NOT EXISTS Events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(255),
    description varchar(255),
    date varchar(255),
    organizer varchar(255)    
); `

const idTableQuery = `CREATE TABLE IF NOT EXISTS Participants (
    user_id INTEGER,
    event_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Persons(id),
    FOREIGN KEY (event_id) REFERENCES Events(id)
);`

const selectDataPersons = `SELECT * FROM Persons`;
const selectDataEvents = `SELECT * FROM Events`;
const selectDataId = `SELECT * FROM Participants`;

const insertDataPersons = `INSERT INTO Persons(name, email, bDate, reference)
VALUES ('Roberto Manchini', 'robbi89@gmail.com', '25/11/1994', 'social media')`;

// const insertDataEvents = `INSERT INTO Events(title, description, date, organizer)
// VALUES ('Football Game', 'nice game', '22/11/2024', 'FIFA')`;

function insertOperation(query) {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          return reject(err);  // Handle error during insertion
        }
        resolve(this.lastID);  // Retrieve the last inserted row ID
      });
    });
}

async function insertDataEvent () {
    for(let i = 0; i < dummyData.length - 1; i++){
        const dataEvent = `INSERT INTO Events(title, description, date, organizer)
        VALUES ('${dummyData[i].title}', '${dummyData[i].description}', '${dummyData[i].date}', '${dummyData[i].organizer}')`;
        await insertOperation(dataEvent);
    }
}

async function createTables () {
    await db.run(userTableQuery);
    await db.run(eventsTableQuery);
    await db.run(idTableQuery);
}

async function insertData () {
    await db.run(insertDataPersons);
    await db.run(insertDataEvents);
}

async function selectData () {
    const persons = await runSelectQuery(selectDataPersons);
    console.log(persons);
    const events = await runSelectQuery(selectDataEvents);
    console.log(events);
    const participants = await runSelectQuery(selectDataId);
    console.log(participants);
}

function runSelectQuery(query) {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          return reject(err);  // If error, reject the Promise
        }
        resolve(rows);  // If successful, resolve the Promise with rows
      });
    });
  }



async function main () {
    await createTables();
    await insertDataEvent();
}

main();


