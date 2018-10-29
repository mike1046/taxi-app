 /* eslint no-unused-vars:0 */
 /* eslint no-console:0 */

const fs = require('fs')
const path = require('path')

const rootPath = '../images'

function readDirectory(source) {
  const sourcePath = path.resolve(__dirname, source)
  return new Promise((resolve, reject) => {
    fs.readdir(sourcePath, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function createFileObject(folderName, fileName) {
  const atIndex = folderName.indexOf('@')
  const number = parseInt(folderName[atIndex + 1])
  const splitName = fileName.split(/(_|\.)/)
  const subfolderName = splitName[0]
  const newName = number > 1
    ? `${subfolderName}@${splitName[2]}.${splitName[4]}`
    : `${subfolderName}.${splitName[4]}`
  return {
    destination: `${rootPath}/${subfolderName}/${newName}`,
    source: `${rootPath}/${folderName}/${fileName}`,
    folder: `${rootPath}/${subfolderName}`,
  }
}

function checkFolder(folderPath) {
  const source = path.resolve(__dirname, folderPath)
  return new Promise((resolve, reject) => {
    fs.open(source, 'r', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function checkAndCreateFolder(folderPath) {
  const source = path.resolve(__dirname, folderPath)
  return checkFolder(source)
    .catch(() => new Promise((resolve, reject) => {
      fs.mkdir(source, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    }),
  )
}

function copyFile(sourcePath, destinationPath) {
  const source = path.resolve(__dirname, sourcePath)
  const destination = path.resolve(__dirname, destinationPath)

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(source).pipe(fs.createWriteStream(destination))
    stream.on('end', resolve)
    stream.on('error', reject)
  })
}

function checkFolderCopyFile(sourcePath, destinationPath, folderPath) {
  const source = path.resolve(__dirname, sourcePath)
  const destination = path.resolve(__dirname, destinationPath)
  const folder = path.resolve(__dirname, folderPath)
  return checkAndCreateFolder(folder)
    .then(() => copyFile(source, destination))
}

readDirectory(rootPath)
  .then(files => files.filter(name => name.indexOf('Images') > -1))
  .then((folders) => {
    console.log('these are the folders', folders)
    const readFolders = folders.map(folder => readDirectory(`${rootPath}/${folder}`)
      .then(files => files.map(file => createFileObject(folder, file))),
    )

    return Promise.all(readFolders)
  })
  .then(mainFolders => mainFolders.reduce((folders, subfolders) => folders.concat(subfolders), []))
  .then((copyActions) => {
    console.log('in copy actions', copyActions)
    const checkIfExists = (group, check) => group.some(one => one === check)
    const uniqueFolders = copyActions.map(copyAction => copyAction.folder)
      .reduce((folders, folder) => {
        if (!checkIfExists(folders, folder)) folders.push(folder)
        return folders
      }, [])
    const createFolders = uniqueFolders.map(folder => checkAndCreateFolder(folder))

    return Promise.all(createFolders).then(() => copyActions)
  })
  .then(copyActions => copyActions.map(
    copyAction => copyFile(copyAction.source, copyAction.destination),
  ))
  .then(status => console.log('all completed in copying image files'))
  .catch(err => console.log('error in copying files', err))
