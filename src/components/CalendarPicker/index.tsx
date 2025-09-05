import React, { useCallback, useState } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import { CalendarPlusIcon } from 'lucide-react'

import { formatDate, formatTime } from '@/lib/utils'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

interface ICalendarPicker {
  name: string
  label: string
  disabled?: boolean
  errorMessage?: string
  control: Control<FieldValues | any>
}

interface IHandleDateChange {
  date?: Date
  field: any
}

interface IHandleTimeChange {
  time?: string
  field: any
}

export const CalendarPicker: React.FC<ICalendarPicker> = ({
  name,
  label,
  control,
  disabled,
  errorMessage,
}) => {
  const [open, setOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)

  const handleDateChange = useCallback(({ date, field }: IHandleDateChange) => {
    if (date) {
      field.onChange(date)
      setCurrentDate(date)
    }

    setCurrentDate(null)
    setOpen(false)
  }, [setCurrentDate, setOpen])

  const handleTimeChange = useCallback(({ time, field }: IHandleTimeChange) => {
    if (time && field.value) {
      const [hours, minutes] = time.split(':').map(Number)
      const updatedDate = new Date(field.value)

      updatedDate.setHours(hours, minutes)
      field.onChange(updatedDate)
    }
  }, [])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='flex flex-wrap w-full gap-4'>
          <div className='flex flex-1 flex-col gap-3'>
            <Label
              htmlFor={`${name}-date`}
              className='px-1'
            >
              {label}
            </Label>

            <Drawer
              open={open}
              onOpenChange={setOpen}
            >
              <DrawerTrigger asChild>
                <Button
                  variant='outline'
                  id={`${name}-date`}
                  className='w-full justify-between font-normal'
                  disabled={disabled}
                >
                  {field.value ? formatDate(field.value) : 'Select date'}
                  <CalendarPlusIcon />
                </Button>
              </DrawerTrigger>

              <DrawerContent className='w-auto overflow-hidden p-0'>
                <DrawerHeader className='sr-only'>
                  <DrawerTitle>Select date</DrawerTitle>
                </DrawerHeader>

                <Calendar
                  mode='single'
                  captionLayout='label'
                  selected={field.value || currentDate}
                  onSelect={(date) => handleDateChange({ date, field })}
                  disabled={disabled}
                />
              </DrawerContent>
            </Drawer>
          </div>

          <div className='flex flex-col gap-3'>
            <Label
              htmlFor={`${name}-time`}
              className='invisible px-1'
            >
              {label}
            </Label>

            <Input
              type='time'
              id={`${name}-time`}
              onChange={({ target }) => handleTimeChange({ time: target.value, field })}
              value={field.value ? formatTime(field.value) : ''}
              disabled={disabled || !field.value}
              className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            />
          </div>

          {errorMessage && <span className='w-full text-sm text-red-600'>{errorMessage}</span>}
        </div>
      )}
    />
  )
}
