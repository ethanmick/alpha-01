import { Item } from './item'
import { uuid } from './uuid'

export abstract class BasicItem {
  readonly id: string = uuid()
}

export class WheatBundleItem extends BasicItem implements Item {
  name = 'Wheat Bundle'
  key = 'wheat.bundle'
  description = 'A harvested bundle of wheat.'
  cost = 10
  value = 25
}
