import React from 'react'
import type { Control, FieldValues } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { FormField } from '@/components/ui/form'
import { DateTimePicker } from '../ui/datetime-picker'

interface ICalendarPick {
  name: string
  label: string
  disabled?: boolean
  errorMessage?: string
  control: Control<FieldValues | any>
}

export const CalendarPick: React.FC<ICalendarPick> = ({
  name,
  label,
  control,
  disabled,
  errorMessage,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className='flex flex-col md:flex-1 gap-3'>
        <Label
          htmlFor='date-from'
          className='px-1'
        >
          {label}
        </Label>

        <div className='flex gap-4'>
          <DateTimePicker {...field} disabled={disabled} />
        </div>

        {errorMessage && <span className='text-sm text-red-600'>{errorMessage}</span>}
      </div>
    )}
  />
)
