import React from 'react'

export const TimeEmpty: React.FC = () => (
  <div className='text-center text-zinc-700 mb-10'>
    <span className='block text-6xl mb-4'>🕒</span>
    <h3 className='scroll-m-20 text-2xl font-semibold'>Ainda não há registros de períodos.</h3>
    <p className='leading-7'>Adicione um novo período de trabalho.</p>
  </div>
)
