//load url from redirect.yml
const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const redirectsFile = fs.readFileSync(path.join(__dirname, 'redirect.yml'), 'utf-8')
//console.log(redirectsFile)
const redirects = YAML.parse(redirectsFile)
//console.log(redirects)

//geneurl page for each url from template.html

const templateHML = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8')

//move through all url redirects and genere an html page

for (let [slug, url] of Object.entries(redirects))
{
    console.log("Generating HTML page for", slug)

    const html = templateHML.replaceAll("https://example.com", url)
}
