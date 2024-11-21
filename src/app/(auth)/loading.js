import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function Loading() {
  return <div className="w-full h-screen flex justify-center">
            <Spinner color="primary" />
        </div>
}
