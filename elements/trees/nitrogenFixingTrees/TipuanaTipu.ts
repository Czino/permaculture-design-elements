import { Fabaceae } from './Fabacaea'

const properties = [
  'fastGrowing',
  'goldenFlowers',
  'greenLeaves',
]
const inputs = [
  'warmth'
]
const outputs = [
  'flowers',
  'nectar',
  'saponins',
  'seeds',
  'tannins',
]

export class TipuanaTipu extends Fabaceae {
  constructor () {
    super()

    this.properties = this.properties.concat(properties)
    this.inputs = this.inputs.concat(inputs)
    this.outputs = this.outputs.concat(outputs)
  }
}