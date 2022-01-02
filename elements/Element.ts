export class Element {
  properties: string[]
  inputs: string[]
  outputs: string[]

  constructor () {
    this.properties = []
    this.inputs = []
    this.outputs = []
  }
}