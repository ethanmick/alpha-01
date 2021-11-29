import { Item } from './item'
import { uuid } from './uuid'

export class WheatBundleItem implements Item {
  readonly id: string

  name = 'Wheat Bundle'
  description = 'A harvested bundle of wheat.'
  icon = '🌾'
  weight = 0.5
  cost = 10
  value = 10

  constructor() {
    this.id = uuid()
  }
}
