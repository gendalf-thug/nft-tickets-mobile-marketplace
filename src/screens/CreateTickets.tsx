import React from 'react'

import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm} from 'react-hook-form'
import * as yup from 'yup'

import {CreateTickets} from 'src/components/CreateTickets'
import {useTypedNavigation} from 'src/hooks'

const schema = yup
  .object({
    eventName: yup
      .string()
      .required('This field is required')
      .min(2, 'The event name is too short')
      .max(130, 'The event name is too long'),
    location: yup
      .string()
      .required('This field is required')
      .min(2, 'The record is too short'),
    country: yup.string().required('This field is required'),
    time: yup.date().required('This field is required'),
    date: yup
      .date()
      .required('This field is required')
      .min(new Date(), 'The date is already in the past'),
    price: yup
      .number()
      .required('This field is required')
      .positive('The price cannot be negative')
      .integer('The number must be an integer'),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export function CreateTicketsScreen() {
  const {goBack, navigate} = useTypedNavigation()
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(Date.now() - 10000),
      time: new Date(),
    },
  })

  const onSubmit = async (data: any) => {
    const {eventName, location, country, time, date, price} = data
    try {
      navigate('result', {
        text: JSON.stringify(data),
        isSuccessfully: true,
      })
    } catch (error) {
      console.error('😭 - error:', error)
    }
  }
  const onInvalid = async (e: any) => {
    console.log('😭 - error:', e)
  }

  return (
    <FormProvider {...form}>
      <CreateTickets
        handleSubmit={form.handleSubmit(onSubmit, onInvalid)}
        onBack={goBack}
      />
    </FormProvider>
  )
}
