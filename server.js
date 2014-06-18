var http = require('http'),
    connect = require('connect'),
    vhost = require('vhost'),
    port = 8080,
    app = connect(),
    local1App = connect(),
    local2App = connect(),
    otherApp = connect();

app
  .use(connect.logger('dev'))
  .use(vhost('local1.dev', local1App))
  .use(vhost('local2.dev', local2App))
  .use(vhost('*.dev', otherApp));

local1App.use(function(req, res) {
  res.end('local1');
});

local2App.use(function(req, res) {
  res.end('local2');
});

otherApp.use(function(req, res) {
  res.end('other');
});

app.listen(port, function() {
  console.log('Listening to port', port);
});
