var connect = require('connect'),
    vhost = require('vhost'),
    port = 8080,
    app = connect(),
    local1App = connect(),
    local2App = connect(),
    otherApp = connect(),
    Cookies = require('cookies');

app
  .use(connect.logger())
  .use(vhost('s1.local.dev', local1App))
  .use(vhost('s2.local.dev', local2App))
  .use(vhost('*.local.dev', otherApp));

local1App.use(function(req, res) {
  var cookies = new Cookies(req, res);
  cookies.set('cookie_no_domain', 1);
  cookies.set('cookie_with_domain', 2, { domain: 'local.dev' });
  res.write('Host: ' + req.headers.host + '\n');
  res.end('\n');
});

local2App.use(function(req, res) {
  var cookies = new Cookies(req, res);
  res.write('Host: ' + req.headers.host + '\n');
  res.write('Cookie no domain: ' + cookies.get('cookie_no_domain') + '\n');
  res.write('Cookie with domain: ' + cookies.get('cookie_with_domain') + '\n');
  res.end('\n');
});

otherApp.use(function(req, res) {
  res.write('Host: ' + req.headers.host + '\n');
  res.end('\n');
});

app.listen(port, function() {
  console.log('Listening to port', port);
});

