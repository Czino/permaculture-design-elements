import { Element } from '../Element'

const properties = [
  'bigSurfaceArea',
  'branchPattern',
  'hard',
  'roots',
  'tall',
  'torus',
]

const inputs = [
  'carbonDioxide',
  'nutrients',
  'minerals',
  'oxygen',
  'pollen',
  'pruning',
  'soil',
  'sun',
  'water',
  'wind',
]

const outputs = [
  'bark',
  'dustCollection',
  'microclimate',
  'mulch',
  'nutrientTransport',
  'oxygen',
  'privacy',
  'rainProtection',
  'sap',
  'seeds',
  'shadow',
  'soilLoosening',
  'soilStabilization',
  'water',
  'waterHolding',
  'waterPurification',
  'waterTransport',
  'wildlifeHabitat',
  'windReduction',
  'wood',
]

export class Tree extends Element {
  constructor () {
    super()

    this.properties = this.properties.concat(properties)
    this.inputs = this.inputs.concat(inputs)
    this.outputs = this.outputs.concat(outputs)
  }
}