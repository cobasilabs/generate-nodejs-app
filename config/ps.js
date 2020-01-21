const util = require('util')
const fs = require('fs')
const { exec } = require('child_process')

module.exports = {
  mkdir: util.promisify(fs.mkdir),
  writeFile: util.promisify(fs.writeFile),
  exec: util.promisify(exec),
  execInFolder: async function (folder, command) {
    await this.exec(`cd ${folder} && ${command} > /dev/null 2>&1`)
  }
}
