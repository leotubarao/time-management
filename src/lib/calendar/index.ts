interface ICalendarNavigationProps {
  yearRange: number
  month?: Date
}

export const disableLeftNavigation = ({ yearRange, month }: ICalendarNavigationProps) => {
  const today = new Date()
  const startDate = new Date(today.getFullYear() - yearRange, 0, 1)

  if (!month) return false

  return (
    month.getMonth() === startDate.getMonth() && month.getFullYear() === startDate.getFullYear()
  )
}

export const disableRightNavigation = ({ yearRange, month }: ICalendarNavigationProps) => {
  const today = new Date()
  const endDate = new Date(today.getFullYear() + yearRange, 11, 31)

  if (!month) return false

  return (
    month.getMonth() === endDate.getMonth() && month.getFullYear() === endDate.getFullYear()
  )
}
