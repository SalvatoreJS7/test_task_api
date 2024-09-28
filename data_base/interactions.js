import sqlite3 from 'sqlite3';


function getDB () {
    let db = new sqlite3.Database('./data_base/db.db');
    return db;
}

function runSelectQuery(query) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        return reject(err);  // If error, reject the Promise
      }
      resolve(rows);  // If successful, resolve the Promise with rows
    });
  });
}

function insertOperation(query) {
    const db = getDB();
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          return reject(err);  // Handle error during insertion
        }
        resolve(this.lastID);  // Retrieve the last inserted row ID
      });
    });
  }
  

export async function insertParticipant (participant) {
    const eventID = participant.eventID;
    const insertDataPersons = `INSERT INTO Persons(name, email, bDate, reference)
    VALUES ('${participant.user.name}', '${participant.user.email}', '${participant.date}', '${participant.reference}')`;
    const personID = await insertOperation(insertDataPersons); 
    console.log('hui', personID)
    const insertDataParticipants = `INSERT INTO Participants(user_id, event_id)
    VALUES ('${personID}', '${eventID}')`;

    const db = getDB();
    await db.run(insertDataParticipants);
}

export async function getAllEvents () {
  const query = `SELECT * FROM Events`;
  return await runSelectQuery(query);
}

export async function getEventParticipants (eventID) {
  const query = `SELECT user_id FROM Participants WHERE event_id=${eventID}`;
  const userIDs = await runSelectQuery(query);
  const IDs = userIDs.map((item) => item.user_id);
  const query2 = `SELECT * FROM Persons WHERE id IN  (${IDs.join(', ')})`;
  const users = await runSelectQuery(query2);
  return users;
}




