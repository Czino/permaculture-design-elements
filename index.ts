import toml from 'toml'
import fs from 'fs'
import glob from 'glob'
import path from 'path'

type Element = {
  [key: string]: string|string[],
  parent?: string,
  name: string,
  properties: string[],
  inputs: string[],
  outputs: string[],
  edible?: string[],
  medicinal?: string[],
  pests?: string[],
}


/**
 * @description Method to filter array for unique values
 * @param [key] set if values are objects, filter by key
 * @returns curried function to filter unique values
 * @example [1, 2, 3, 3].filter(unique)
 * @example [{a: 1}, {a: 2}, {a: 3}, {a: 3}].filter(unique('a'))
 */
const unique = (key: string) => {
  if (key) {
      return (obj: any, index: number, self: any[]) => {
          return self.findIndex(s => s[key] === obj[key]) === index;
      };
  }

  return (obj: any, index: number, self: any[]) => {
      return self.findIndex(s =>s === obj) === index;
  };
};

const allMaterial = glob.sync(path.join(__dirname, 'elements/**/*.toml'))
  .map((path: string) => [
    path.replace(`${__dirname}/elements/`, '').replace('.toml', '').split('/').slice(0, -1),
    fs.readFileSync(path, { encoding: 'utf-8'})
  ])
  .map(([path, file]) => [
    path,
    toml.parse(file as string)
  ])
  .filter(([, element]) => element.name)
  .map(([path, element]) => {
    element.id = element.name.toLowerCase()
    element.path = path
    element.groups = element.groups
      ? element.groups.map((group: string) => group.toLowerCase())
      : []
    return element
  })
  .sort((a, b) => {
    if (a.path.length === b.path.length) return 0
    return a.path.length > b.path.length ? 1 : -1
  })
  .map((element, index, elements: Element[]) => {
    const parent = element.path[element.path.length - 1]

    if (!parent) return element
    const parentElement = elements.find((e: Element) => e.id === parent)
    const groups = elements.filter((e: Element) => element.groups.indexOf(e.id) !== -1)

    ;['properties', 'inputs', 'outputs', 'edible', 'medicinal', 'pests']
      .forEach(attr => {
        if (parentElement && parentElement[attr]) element[attr] = element[attr].concat(parentElement[attr]).filter(unique)
        groups.forEach(group => {
          if (group && group[attr]) element[attr] = element[attr].concat(group[attr]).filter(unique)
        })
      })
    return element
  })

console.log(allMaterial)