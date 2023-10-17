//load url from redirect.yml
const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const redirectsFile = fs.readFileSync(path.join(__dirname, 'redirect.yml'), 'utf-8')
console.log(redirectsFile)
//geneurl page for each url from template.html
