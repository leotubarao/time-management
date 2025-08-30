import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useActionTimes } from '@/store/actions/times'
import { timeFormResolver, type TimeFormData } from './schema'

import { Form as FormUI } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CalendarPick } from '@/components/CalendarPick'

export const TimeForm: React.FC = () => {
  const dispatchTime = useActionTimes()

  const form = useForm<TimeFormData>({
    resolver: timeFormResolver,
  })

  const onSubmit = useCallback(({ startTime, endTime }: TimeFormData) => {
    dispatchTime.addTime({ start: startTime, end: endTime })
    form.reset()
  }, [dispatchTime, form])

  return (
    <FormUI {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full min-w-0 flex-col md:flex-row gap-6'>
          <CalendarPick
            label='Início'
            name='startTime'
            control={form.control}
          />
          <CalendarPick
            label='Término'
            name='endTime'
            control={form.control}
            errorMessage={form.formState.errors.endTime?.message}
            disabled={!form.watch('startTime')}
          />
        </div>

        <Button
          type='submit'
          className='w-32'
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Salvar
        </Button>
      </form>
    </FormUI>
  )
}
