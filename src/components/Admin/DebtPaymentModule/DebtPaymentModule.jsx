import React from 'react'
import CardModule from '../CardModule'
import axiosInstance from '../../../../services/axios/axiosInstance';
import { useEffect, useState } from 'react';

export default function DebtPaymentModule({ setHeadingText }) {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setHeadingText('Pagos de Deudas')
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";

        axiosInstance.get(api, {
            params: {
                endpoint: '/debtPayment/getAll',
            }
        })
            .then(res => {
                setPayments(res.data.payments)
                setLoading(false)
                console.log(res.data.payments);

            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    return (
        <div className='flex justify-center'>
            {
                loading ? <h1>CARGANDO</h1> :
                    <CardModule className={'overflow-x-auto md:w-4/8'}>
                        <table className='table-auto w-full'>
                            <thead className='border-b border-neutral-500'>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Deuda</th>
                                    <th>Pago</th>
                                    <th>Fecha</th>                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment, index) => (
                                        <tr key={index} className={payment.debt.payedAmount === payment.debt.quantity * payment.debt.product.price ? 'bg-green-700' : ''}>
                                            <td>{index + 1}</td>
                                            <td>{payment.debt.debtor.name}</td>
                                            <td>{payment.debt.product.name}</td>
                                            <td>{payment.debt.quantity}</td>
                                            <td>{payment.debt.quantity * payment.debt.product.price}</td>
                                            <td>{payment.amount}</td>
                                            <td>{new Date(payment.date).toLocaleString()}</td>
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
