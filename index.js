import { insertParticipant, getAllEvents, getEventParticipants } from './data_base/interactions.js';
import express from 'express';
import cors from 'cors';

const app = express ();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
  });

app.get ('/status', (request, response) => {
    const status = {
        'Status': 'Running'
    };

    response.send(status);
});

app.get ('/events', async (request, response) => {
    console.log('hunter', request);
    const dummyData = await getAllEvents();
    const page = Number(request.query.page);
    if (!(page > 0 && page < 1000)) {
        response.status(422).send('incorrect page number');
        return;
    }
    const data = dummyData.slice(12*(page - 1),12*page);
    const responseData = {
        events: data,
        currentPage: page,
        totalRecords: dummyData.length,
        recordsPerPage: 12,
    }
    response.send(responseData);
});

app.post ('/participants', (request, response) => {
    console.log('piska', request.body);
    insertParticipant(request.body);
    response.send('');
})

app.get ('/participants', async (request, response) => {
    const event_id = Number(request.query.event_id);
    const responseData = await getEventParticipants(event_id);
    response.send(responseData);
});