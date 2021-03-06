import fs from 'fs'
import path from 'path'
import express from 'express'

export default (() => {
  let routers = []

  for (let file of fs.readdirSync(__dirname)) {
    const file_path = path.join(__dirname, file)
    const name = path.basename(file, path.extname(file))
    const stats = fs.statSync(file_path)

    // Continue condition
    if ((/^index\./.test(file)) ||
        (/^\./.test(file)) ||
        !stats.isFile())
    {
      continue
    }
    const router = require(file_path)
    routers.push(router)
  }

  return routers
})()
