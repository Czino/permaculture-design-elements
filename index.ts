import toml from 'toml'
import fs from 'fs'
import glob from 'glob'
import path from 'path'

const allMaterial = glob.sync(path.join(__dirname, '/elements/**/*.toml'))
  .map((path: string) => fs.readFileSync(path, { encoding: 'utf-8'}))
  .map((file: string) => toml.parse(file))
  .map((element: object) => {
    console.log(element)
    return element
  })