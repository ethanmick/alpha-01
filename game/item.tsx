export interface Item {
  id: string
  key: string
  name: string
  cost?: number
  value?: number
}

export class ItemStack {
  constructor(public item: Item, public count: number) {}

  use(count: number): number {
    if (this.count < count) {
      count = this.count
      this.count = 0
    } else {
      this.count -= count
    }
    return count
  }
}

export class Inventory {
  constructor(public stacks: ItemStack[] = []) {}

  add(item: Item, amount = 1) {
    const stack = this.stacks.find((stack) => stack.item.name === item.name)
    if (stack) {
      stack.count += amount
    } else {
      this.stacks.push(new ItemStack(item, amount))
    }
  }

  findById(id: string): ItemStack | undefined {
    return this.stacks.find((stack) => stack.item.id === id)
  }

  findByKey(key: string): ItemStack | undefined {
    return this.stacks.find((stack) => stack.item.key === key)
  }
}
