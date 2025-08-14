import { z, number } from 'zod';


export const ProductValidation ={
    title: '',
    discription: '',
    media: [],
    price: 10,
    pay: 10,
    sizes: [],
    category: '',
    collections:[],
    colors: [],
    tags: [],
    brand: '',
}

export const formSchema = z.object({
    title: z.string().trim().max(30, {
        message: "Title must be at least 30 characters."
    }).min(2, {
      message: "Title must be at least 2 characters.",
    }),
    discription: z.string().max(700, {
        message: "Title must be at least 700 characters."
    }).min(100, {
      message: "Title must be at least 2 characters.",
    }),
    media: z.array(z.string().url()),
    price: z.coerce.number(),
    tags: z.array(z.string()),
    category: z.string().max(20).min(2),
    collections: z.array(z.string()),
    brand: z.string(),
    colors: z.array(z.string()),
    sizes: z.array(z.string()),
    pay: z.coerce.number()
  })