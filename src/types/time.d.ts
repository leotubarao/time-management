export declare namespace Time {
  interface DateRange {
    start: Date
    end: Date
  }

  interface Item {
    id: string
    dateRange: DateRange
  }

  type State = Item[]

  type Type = 'ADD_TIME' | 'DELETE_TIME'
}
