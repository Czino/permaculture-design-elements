import { Element } from '../Element'

const properties = [
  'dead',
  'hard',
  'heavy',
]
const inputs = [
  'sun',
  'wind',
]
const outputs = [
  'condensation',
  'heatRadiation',
  'minerals',
  'rainCollection',
  'shade',
  'shelter',
  'soilStabilization',
  'windReduction',
]

export class Stone extends Element {
  constructor () {
    super()

    this.properties = this.properties.concat(properties)
    this.inputs = this.inputs.concat(inputs)
    this.outputs = this.outputs.concat(outputs)
  }
}