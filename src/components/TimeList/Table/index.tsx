import React, { useCallback } from 'react'
import { Trash2 } from 'lucide-react'

import type { Time } from '@/types'

import { useActionTimes } from '@/store/actions/times'
import { calculateTotalHours, formatDate, formatHours } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface TimeTableListProps {
  times: Time.State
}

export const TimeTableList: React.FC<TimeTableListProps> = ({ times }) => {
  const dispatchTime = useActionTimes()

  const handleDelete = useCallback((id: string) => {
    dispatchTime.deleteTime(id)
  }, [dispatchTime])

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Período de Início</TableHead>
            <TableHead>Período de Término</TableHead>
            <TableHead className='text-right'>Horas trabalhadas</TableHead>
            <TableHead className='text-right'></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {times.map((time) => (
            <TableRow key={time.id}>
              <TableCell>{formatDate(time.dateRange.start)}</TableCell>
              <TableCell>{formatDate(time.dateRange.end)}</TableCell>
              <TableCell className='text-right'>
                {formatHours(time.dateRange.end, time.dateRange.start)}
              </TableCell>
              <TableCell className='text-right'>
                <Button
                  variant='default'
                  onClick={() => handleDelete(time.id)}
                  className='h-8 w-8 p-0 bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500'
                >
                  <span className='sr-only'>Delete</span>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className='bg-gray-50'>
          <TableRow>
            <TableCell colSpan={3}>Horas totais trabalhadas</TableCell>
            <TableCell className='text-right text-bold'>
              {calculateTotalHours(times)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
