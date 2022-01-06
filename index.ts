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
  .map(([path, element]) => {
    element.path = path
    return element
  })
  .sort((a, b) => {
    if (a.path.length === b.path.length) return 0
    return a.path.length > b.path.length ? 1 : -1
  })
  .map((element, index, elements: Element[]) => {
    const parent = element.path[element.path.length - 1]

    if (!parent) return element
    const parentElement = elements
      .filter(e => e.name)
      .find((e: Element) => e.name.toLowerCase() === parent.toLowerCase())

    if (!parentElement) return element

    ;['properties', 'inputs', 'outputs', 'edible', 'medicinal', 'pests']
      .filter(attr => parentElement[attr])
      .forEach(attr => {
        element[attr] = element[attr].concat(parentElement[attr]).filter(unique)
      });
    console.log(element.name, parentElement.name, element.properties)
    return element
  })