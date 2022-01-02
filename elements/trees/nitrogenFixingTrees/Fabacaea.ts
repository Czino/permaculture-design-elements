import { Tree } from '../Tree'

const properties: string[] = []
const inputs = [
  'nitrogen',
]
const outputs = [
  'nitrogen',
]

export class Fabaceae extends Tree {
  constructor () {
    super()

    this.properties = this.properties.concat(properties)
    this.inputs = this.inputs.concat(inputs)
    this.outputs = this.outputs.concat(outputs)
  }
}