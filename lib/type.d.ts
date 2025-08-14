
type CollectionType = {
    _id: string,
    title: string,
    discription: string,
    image: string,
    products: ProductType[],
    createdAt: Date,
    updatedAt: Date
}


type ProductType ={
    _id: string
    title: string,
    discription: string,
    media: [string],
    price: number,
    pay: number,
    sizes: [string],
    category: string,
    collections:[string],
    colors: [string],
    tags: [string],
    brand: string,
    createdAt: Date,
    updatedAt: Date
}

type CustomerType ={
    _id: string,
    clerkId: string,
    email: string,
    name: string,
    orders: [string],
    createdAt: string,
    updatedAt: Date
}

type ShippingAddressType ={
    street: string,
    city: string,
    state: string,
    postalCode: string
}

type OrderType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    shippingRate:string;
    shippingAddress: ShippingAddressType;

    createdAt: string
}

type OrderItemType ={
    shippingRate:string;
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
}