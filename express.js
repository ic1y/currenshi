const exp = require('express'),
  app = exp();
app.get('/', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
})
app.use(exp.static('./public'));
app.listen(3100);
console.log('OK');