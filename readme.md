# 28. Bonus Progressive Web App
## Referince link
[express-sslify npm](https://www.npmjs.com/package/express-sslify)

[lighthouse plugin](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)

## Note on server.js code
We have to make one minor change to make sure our code doesn't require us to use https in development. In our server.js file, on line 16 we have:

app.use(enforce.HTTPS({ trustProtoHeader: true }));
We want to move this into the conditional block we have that checks if our NODE_ENV is in production mode from line 19-25, simply move the line above into that if block like so:

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true })); <==== Right here
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

One note regarding running the application in development, you have to modify your server.js code to run compression and enforce https in the production section of the code! To do so, simply change

app.use(compression);
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server is running on port ' + port);
});
to

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(compression);
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server is running on port ' + port);
});
