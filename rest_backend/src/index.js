import http from 'http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/version', (req, res) => res.send('1.0.0'));


mongoose.connect('mongodb+srv://admin:admin@cluster0-dfjjj.mongodb.net/test?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function() {
 console.log("Połączenie udane!");
});


const Schema = mongoose.Schema;
const Wycieczka = new Schema({
  nazwa: String,
  docelowyKrajWycieczki: String,
  dataRozpoczecia: String,
  dataZakonczenia: String,
  cenaJednostkowa: Number,
  maxIloscMiejsc: Number,
  opis: String,
  linkDoZdj: String,
  ileZarezerwowano: Number,
  oceny: Array,
});

mongoose.model('Wycieczka', Wycieczka);

const WycieczkaModel = mongoose.model('Wycieczka');
// const task = new WycieczkaModel({
//   nazwa: "Dwutygodniowa wycieczka do Egiptu",
//   docelowyKrajWycieczki: "Egipt",
//   dataRozpoczecia: "2019-12-12",
//   dataZakonczenia: "2019-12-26",
//   cenaJednostkowa: 1000,
//   maxIloscMiejsc: 10,
//   opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
//   linkDoZdj: "https://picsum.photos/100/100",
//   ileZarezerwowano: 0,
//   oceny: [],
// });

// task.save((err) => {
//   if (err) throw err;
//   console.log('Zadanie został o zapisane.');
// });


app.get('/wycieczki', function (req, res) {
  WycieczkaModel.find({}, (err, tasks) => {
    res.send(tasks);
  });
});

app.get('/wycieczki/:wycieczkaId', function (req, res) {
  console.log(req.params['wycieczkaId']);
  WycieczkaModel.find({'_id': req.params['wycieczkaId']}, (err, tasks) => {
    res.send(tasks);
  });
});

app.post('/wycieczki', (req, res) => {
  console.log("Otrzymano żądanie POST dla strony głównej");

  const newWycieczka = new WycieczkaModel(req.body);

  newWycieczka.save((err, wycieczka) => {
    res.send(wycieczka._id);
  });
});

app.delete('/wycieczki/:wycieczkaId', (req, res) => {
  WycieczkaModel.findById(req.params['wycieczkaId'], (err, task) => {
    task.remove();
  });
});

app.put('/wycieczki/:wycieczkaId', (req, res) => {
  WycieczkaModel.update( {_id: req.params['wycieczkaId']},
    req.body,
    {multi: false},
    (err, rows_updated) => {
      res.send({rows_updated});
    }
  );
});


app.server.listen(5016, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

// mongoose.disconnect();


export default app;
