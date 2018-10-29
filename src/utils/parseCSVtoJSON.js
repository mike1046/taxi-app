/* eslint no-console:0 */
// this is to be run on node. parses csv files to a pretty json file.
const fs = require('fs')
const path = require('path')

function fetchCSV(filePath) {
  return new Promise((resolve, reject) => {
    const options = {
      encoding: 'utf8',
    }
    fs.readFile(filePath, options, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function parseLine(csvLine) {
  const regex = /"(.*)"/

  return csvLine.split(',')
    .map((column) => {
      const finding = column.match(regex)
      return finding ? finding[1] : column
    })
}

function createDataCreator(csvHeader) {
  const regex = /"(.*)"/
  const attributes = csvHeader.split(',')
    .map(attribute => attribute.match(regex)[1])

  return function Data(...args) {
    return attributes.reduce((data, attribute, index) => {
      const newData = data
      newData[attribute] = args[index]
      return newData
    }, {})
  }
}

function getData(filePath) {
  return fetchCSV(filePath)
    .then((data) => {
      const lines = data.split('\r\n')
      const header = lines.shift()
      const DataCreator = createDataCreator(header)
      const information = lines.reduce((collection, line) => {
        if (line) {
          const newData = DataCreator.apply(this, parseLine(line))
          collection.push(newData)
        }
        return collection
      }, [])
      return information
    })
}

function createJSON(destination, jsObject) {
  const json = JSON.stringify(jsObject, null, '\t')
  const options = { encoding: 'utf8' }

  return new Promise((resolve, reject) => {
    fs.writeFile(destination, json, options, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function DataFile(filePathInput) {
  const regex = /\/(.*)\./
  const filePath = path.resolve(filePathInput)
  this.filePath = filePath
  this.fileName = filePathInput.match(regex)[1]
}

DataFile.prototype.getJSON = () => {
  const filePath = this.filePath
  const fileName = `${this.fileName}.json`
  const destination = path.resolve('./', fileName)
  return getData(filePath)
    .then(data => createJSON(destination, data))
    .then(() => destination)
}


// Does all the work of parsing whatever file you provide it on cli

const fp = process.argv[2];

(function iffy(filePath) {
  const file = new DataFile(filePath)

  file.getJSON()
    .then(destination => console.log(['JSON successfully created to :', destination].join(' ')))
    .catch(err => console.log(['Error in creating JSON file :', err].join(' ')))
}(fp))
