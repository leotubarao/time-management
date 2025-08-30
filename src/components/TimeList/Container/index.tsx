import React from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/types'

import { TimeList } from '..'

export const TimeContainer: React.FC = () => {
  const timesState = useSelector(({ times }: RootState) => times)

  return (
    <div className='container max-w-[1200px] mx-auto flex flex-col gap-10'>
      <TimeList.Form />

      {timesState.length > 0 ? (
        <TimeList.Table times={timesState} />
      ) : (
        <TimeList.Empty />
      )}
    </div>
  )
}
