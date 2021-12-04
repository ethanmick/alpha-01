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

export class TimberLogItem extends BasicItem implements Item {
  name = 'Log'
  key = 'wood.timber'
  description = 'A log from a tree'
  cost = 10
  value = 20
}

export class BasicRockItem extends BasicItem implements Item {
  name = 'Rock'
  key = 'stone.basic'
  description = 'A basic rock'
  cost = 4
  value = 2
}
