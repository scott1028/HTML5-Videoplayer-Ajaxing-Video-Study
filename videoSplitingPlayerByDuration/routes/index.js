var express = require('express');
var router = express.Router();

var streams = require('memory-streams');
var ffmpeg = require('fluent-ffmpeg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/video', (req, res, next) => {
  console.log(req.query);

  let ss = (req.query.ss || '0').toHHMMSS();
  let to = (req.query.to || '1').toHHMMSS();

  // Example:
  //  ffmpeg -i ./fixtures/origin.mp4 -ss 00:00:00 -to 00:00:06 -f webm - > aaa.webm
  // res.writeHead(200, {
  //   'Content-Type': 'video/webm',
  // });
  ffmpeg('./fixtures/origin.mp4')
    .outputOptions([
      `-ss ${ss}`,
      `-to ${to}`,
      `-vf scale=320:240`,
    ])
    .format('webm')
    .pipe()
    .on('data', chunk => {
      console.log(chunk);
      res.write(chunk);
    })
    .on('end', () => {
      res.end();
    });
});

module.exports = router;
