import { z } from "zod";


export const CollectionValidation ={
    title: '',
    discription: '',
    image: ''
}

export const formSchema = z.object({
    title: z.string().max(30, {
        message: "Title must be at least 30 characters."
    }).min(2, {
      message: "Title must be at least 2 characters.",
    }),
    discription: z.string().max(700, {
        message: "Title must be at least 700 characters."
    }).min(100, {
      message: "Title must be at least 2 characters.",
    }),
    image: z.string().url(),
  })