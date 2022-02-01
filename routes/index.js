var _ = require('underscore');

// TODO: This shoul be read from a database
var heroes = [
  { 
    name: 'Orari giornalieri', 
    facts: [
      'Circuito radiatori - Fascia A', 
      'Circuito Radiatori - Fascia B'] 
  },
  {
    name: 'Programma settimanale',
    facts: [
      'Circuito Raditori', 
      'ACS']
  }
];

var modbus_value = 0;

exports.index = function(req, res) {
  var names = heroes.map(function(p) { return p.name; });
  res.render('index', { heroes: names })
};

exports.hero = function(req, res) {
  var facts = _(heroes).detect(function (p) { 
    return p.name == req.params.name;
  }).facts;
  res.json(facts);
}

exports.writeRegister = function(req, res) {  
  console.log('Send to modbus value ' + req.body.time);
  res.json({status: 'ok' });
}

exports.getValues = function(req, res) {  
  res.json({values: modbus_value});
}

exports.addFact = function(req, res) {
  var hero = _(heroes).detect(function(p) {
    return p.name == req.body.name;
  });
  
  hero.facts.push(req.body.fact);
  
  console.log('New value for ' + hero.name + ': ' + req.body.fact);
  
  res.json({status: 'ok' });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateModbus() {
  modbus_value = getRandomInt(10)
  console.log("reading from modbus: " + modbus_value);
  /*
  client.readHoldingRegisters(109, 2)
  .then(function (resp) {
    console.log(resp.response._body.valuesAsArray)
    socket.end()
  }).catch(function () {
    console.error(require('util').inspect(arguments, {
      depth: null
    }))
    socket.end()
  })*/
}

updateModbus();
setInterval(updateModbus, 5000);
