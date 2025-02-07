import React from 'react'
import CardModule from '../CardModule'
import axiosInstance from '../../../../services/axios/axiosInstance';
import { useEffect, useState } from 'react';

export default function DebtModule({ setHeadingText }) {
    const [debts, setDebts] = useState([]);
    const [debtors, setDebtors] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setHeadingText('Deudas')
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
        const token = localStorage.getItem('token')
        Promise.all([
            axiosInstance.get(api, {
                params: {
                    endpoint: '/debt/getAll',
                }
            }),
            axiosInstance.get(api, {
                params: {
                    endpoint: '/debtor/getAll',

                }
            }),
            axiosInstance.get(api, {
                params: {
                    endpoint: '/product/getAll',
                }
            })
        ]).then(([debtResponse, debtorResponse, productResponse]) => {
            setDebts(debtResponse.data)
            setDebtors(debtorResponse.data)
            setProducts(productResponse.data)

            console.log(debtResponse.data)
            console.log(debtorResponse.data)
            console.log(productResponse.data)
            setLoading(false)
        })
            .catch(err => {
                console.log(err)
            })

    }, [])


    return (
        <>
            <div className='flex justify-center'>
                <CardModule className={'w-1/2'}>
                    <h2 className='text-2xl text-center pb-2 mb-3 border-b border-neutral-500"'>Agregar Deuda</h2>
                    <form className='grid gap-5  grid-cols-1 md:grid-cols-2 text-xl'>
                        <label className='flex justify-center items-center ' htmlFor="debtor">Deudor</label>
                        <select className="border p-2 w-full" name="" id="debtor"></select>
                        <label className='flex justify-center items-center' htmlFor="product">Producto</label>
                        <select className="border p-2 w-full" name="" id="product"></select>
                        <label className='flex justify-center items-center' htmlFor="quantity">Cantidad</label>
                        <input className="border p-2 w-full" type="number" id="quantity" min={1} />
                        <input type="submit" value="Agregar" className='bg-blue-500 text-white p-2 rounded-md md:col-span-2' />
                    </form>
                </CardModule>
            </div>
            {loading ? <div>CARGANDO</div> :
                <CardModule className={'overflow-x-auto'}>
                    <table className='table-auto w-full'>
                        <thead className='border-b border-neutral-500'>
                            <tr className='flex justify-around gap-5 md:gap-0'>
                                <th>#</th>
                                <th>Deudor</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                    </table>
                </CardModule>
            }
        </>
    )
}
