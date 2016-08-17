var banner = require('add-banner'),
    path = require('path'),
    fs = require('fs');

var builtPath = path.join(__dirname, '..', 'build', 'reckon.js'),
    minifiedPath = path.join(__dirname, '..', 'build', 'reckon.min.js');

var built = fs.readFileSync(builtPath, 'utf-8'),
    minified = fs.readFileSync(minifiedPath, 'utf-8');

var options = {
  banner: path.join(__dirname, 'banner.tmpl'),
  name: 'Reckon'
};

fs.writeFileSync(builtPath, banner(built, options));
fs.writeFileSync(minifiedPath, banner(minified, options));
