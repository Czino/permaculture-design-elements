import { Element } from '../Element'

const properties = [
  'level',
  'long',
  'wavy',
  'sinusoidal',
]
const inputs = [
  'mulch',
  'rain',
]
const outputs = [
  'rainCollection',
  'shade',
  'shelter',
  'soilStabilization',
  'windReduction',
]

export class Swale extends Element {
  constructor () {
    super()

    this.properties = this.properties.concat(properties)
    this.inputs = this.inputs.concat(inputs)
    this.outputs = this.outputs.concat(outputs)
  }
}