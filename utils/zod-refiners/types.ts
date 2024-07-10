import {z } from 'zod'

export type Refiner<T> = (value: T, ctx:z.RefinementCtx) => value is T