var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const fileUploader = multer({ storage: multer.memoryStorage() });

var app = express();

app.use(cors())
  .use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', fileUploader.single('upfile'), (req, res) => {
  console.log(req.file, req.body, `${req.file?.originalname}.${req.file?.mimetype?.split('/')[1]}`);

  res.json({
    name: `${req.file?.originalname}`, type: req.file?.mimetype, size: req.file?.size
  });
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
