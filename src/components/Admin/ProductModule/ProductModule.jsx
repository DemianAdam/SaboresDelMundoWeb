import React from 'react'
import CardModule from '../CardModule'
import axiosInstance from '../../../../services/axios/axiosInstance';
import { useEffect, useState } from 'react';

export default function ProductModule() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const api = "https://script.google.com/macros/s/AKfycbwcefyH1SIvGYUOK2a0akLYgOP5XugLo4mWMpD3m9TMdu1a33dhsI42TfLImxqLYEwG/exec";

        axiosInstance.get(api, {
            params: {
                endpoint: '/product/getAll',
                token: localStorage.getItem('token')
            }
        })
            .then(res => {
                setProducts(res.data.products)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const api = "https://script.google.com/macros/s/AKfycbwcefyH1SIvGYUOK2a0akLYgOP5XugLo4mWMpD3m9TMdu1a33dhsI42TfLImxqLYEwG/exec";
        const product = {
            name: e.target.name.value,
            price: e.target.price.value
        }
        const requestObj = {
            endpoint: '/product/add',
            data: {
                product
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setProducts([...products, res.data.product])
                e.target.reset();
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })


    }

    const handleRemove = (id) => {
        const api = "https://script.google.com/macros/s/AKfycbwcefyH1SIvGYUOK2a0akLYgOP5XugLo4mWMpD3m9TMdu1a33dhsI42TfLImxqLYEwG/exec";
        const requestObj = {
            endpoint: '/product/remove',
            data: {
                id
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setProducts(products.filter(product => product.id !== id))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }



    return (
        <div className='flex flex-col items-center'>
            <CardModule >
                <h2 className="text-2xl text-center pb-2 mb-3 border-b border-neutral-500">Añadir Producto</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 items-center">
                    <label htmlFor="name" className="text-start text-xl">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border p-2 w-full"
                    />
                    <label htmlFor="price" className="text-start text-xl">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="border p-2 w-full"
                    />
                    <div className="col-span-2">
                        <input
                            type="submit"
                            value="Añadir"
                            className="w-full border p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        />
                    </div>
                </form>
            </CardModule>
            {
                loading ? <h1>CARGANDO</h1> : <CardModule className={'w-4/6'}>
                    <table className='table-auto w-full'>
                        <thead className='border-b border-neutral-500'>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => (
                                    <tr key={product.id} className='border-b border-neutral-500'>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors'>Editar</button>
                                        </td>
                                        <td>
                                            <button className='bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors' onClick={() => handleRemove(product.id)} >Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </CardModule>
            }

        </div>
    )
}
