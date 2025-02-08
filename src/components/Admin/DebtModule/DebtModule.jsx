import React from 'react'
import CardModule from '../CardModule'
import axiosInstance from '../../../../services/axios/axiosInstance';
import { useEffect, useState } from 'react';
import './DebtModule.css'

export default function DebtModule({ setHeadingText, setShowModal, setModalContent }) {
    const [debts, setDebts] = useState([]);
    const [debtors, setDebtors] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setHeadingText('Deudas')
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
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
            setDebts(debtResponse.data.debts)
            setDebtors(debtorResponse.data.debtors)
            setProducts(productResponse.data.products)

            console.log(debtResponse.data.debts)
            console.log(debtorResponse.data.debtors)
            console.log(productResponse.data.products)
            setLoading(false)
        })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
        const selectedDebtor = e.target.debtor;
        const debtorName = selectedDebtor.options[selectedDebtor.selectedIndex].text;

        const selectedProduct = e.target.product;
        const productName = selectedProduct.options[selectedProduct.selectedIndex].text;

        const debt = {
            debtorId: e.target.debtor.value,
            productId: e.target.product.value,
            quantity: e.target.quantity.value,
            date: new Date(),
            debtorName: debtorName,
            productName: productName
        }
        console.log(debt);

        const requestObj = {
            endpoint: '/debt/add',
            data: {
                debt
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setDebts([...debts, res.data.debt])
                console.log(res.data.debt);

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
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
        const requestObj = {
            endpoint: '/debt/remove',
            data: {
                id
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setDebts(debts.filter(debt => debt.id !== id))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUpdate = (e, debtId) => {
        e.preventDefault()
        setShowModal(false)
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
        const selectedDebtor = e.target.debtor;
        const debtorName = selectedDebtor.options[selectedDebtor.selectedIndex].text;

        const selectedProduct = e.target.product;
        const productName = selectedProduct.options[selectedProduct.selectedIndex].text;

        const debt = {
            id: debtId,
            debtorId: e.target.debtor.value,
            productId: e.target.product.value,
            quantity: e.target.quantity.value,
            date: new Date(),
            debtorName: debtorName,
            productName: productName
        }

        console.log(debt);

        const requestObj = {
            endpoint: '/debt/update',
            data: {
                debt
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setDebts(debts.map(debt => debt.id === debtId ? res.data.debt : debt))
                console.log(res.data.debt);

                e.target.reset();
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handlePayment = (e, debt) => {
        e.preventDefault()
        setShowModal(false)
        const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
        const payment = {
            debtId: debt.id,
            amount: e.target.amount.value,
            date: new Date()
        }

        const requestObj = {
            endpoint: '/debtPayment/add',
            data: {
                payment
            },
            token: localStorage.getItem('token')
        }
        setLoading(true)
        axiosInstance.post(api, JSON.stringify(requestObj))
            .then(res => {
                setDebts(debts.map(d => d.id === debt.id ? res.data.debt : d))
                console.log(res.data.payment);

                e.target.reset();
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const debtPaymentForm = (onHide, debt) =>
        <form onSubmit={(e) => handlePayment(e, debt)} className='grid gap-5 grid-cols-1 md:grid-cols-2 text-xl'>
            <label className='flex justify-center items-center'>Deudor</label>
            <input className="border p-2 w-full" type="text" value={debt.debtor.name} disabled />
            <label>Producto</label>
            <input className="border p-2 w-full" type="text" value={debt.product.name} disabled />
            <label>Cantidad</label>
            <input className="border p-2 w-full" type="number" value={debt.quantity} disabled />
            <label>Total</label>
            <input className="border p-2 w-full" type="number" value={debt.quantity * debt.product.price} disabled />
            <label htmlFor="amount">Cantidad a pagar</label>
            <input className="border p-2 w-full" type="number" id="amount" min={1} />
            <input type="submit" value="Pagar" />
            <button type='button' onClick={(e) => { e.preventDefault(); onHide() }}>Cancelar</button>
        </form>

    const showPaymentModal = (debt) => {
        setModalContent({
            body: debtPaymentForm(() => setShowModal(false), debt),
            title: 'Pagar Deuda'
        })
        setShowModal(true)
    }

    const editDebtForm = (onHide, debtId) =>
        <form onSubmit={(e) => handleUpdate(e, debtId)} className='grid gap-5 grid-cols-1 md:grid-cols-2 text-xl'>
            <label className='flex justify-center items-center' htmlFor="debtor">Deudor</label>
            <select className="border p-2 w-full" id="debtor">
                {debtors.map(debtor => <option key={debtor.id} value={debtor.id}>{debtor.name}</option>)}
            </select>
            <label htmlFor="product">Producto</label>
            <select className="border p-2 w-full" id="product">
                {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </select>
            <label htmlFor="quantity">Cantidad</label>
            <input className="border p-2 w-full" type="number" id="quantity" min={1} />
            <div>
                <input type="submit" value="Editar" />
                <button type='button' onClick={(e) => { e.preventDefault(); onHide() }}>Cancelar</button>
            </div>
        </form>

    const showEditModal = (debt) => {
        setModalContent({
            body: editDebtForm(() => setShowModal(false), debt.id),
            title: 'Editar Deuda'
        })
        setShowModal(true)
    }

    return (
        <>
            <div className='flex justify-center'>
                <CardModule className={'w-1/2'}>
                    <h2 className='text-2xl text-center pb-2 mb-3 border-b border-neutral-500'>Agregar Deuda</h2>
                    <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1 md:grid-cols-2 text-xl'>
                        <label className='flex justify-center items-center' htmlFor="debtor">Deudor</label>
                        <select className="border p-2 w-full" id="debtor">
                            {debtors.map(debtor => <option key={debtor.id} value={debtor.id}>{debtor.name}</option>)}
                        </select>
                        <label className='flex justify-center items-center' htmlFor="product">Producto</label>
                        <select className="border p-2 w-full" id="product">
                            {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                        </select>
                        <label className='flex justify-center items-center' htmlFor="quantity">Cantidad</label>
                        <input className="border p-2 w-full" type="number" id="quantity" min={1} />
                        <input type="submit" value="Agregar" className='bg-blue-500 text-white p-2 rounded-md md:col-span-2' />
                    </form>
                </CardModule>
            </div>
            {loading ? <div>CARGANDO</div> :
                <CardModule className={'overflow-x-auto'}>
                    <table className='relative table-auto w-full '>
                        <thead className='border-b border-neutral-500'> 
                            <tr>
                                <th>#</th>
                                <th>Deudor</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Total Pagado</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                                <th>Pagar</th>
                            </tr>
                        </thead>
                        <caption className='absolute border-b w-[94.5%] border-neutral-500'></caption>
                        <tbody >
                            {debts.map((debt, index) => (
                                // Added border classes to each row for a horizontal line between rows
                                <tr key={debt.id} className='border-b border-neutral-500' >
                                    <td className='p-3'>{index + 1}</td>
                                    <td className='p-3'>{debt.debtor.name}</td>
                                    <td className='p-3'>{debt.product.name}</td>
                                    <td className='p-3'>{debt.quantity}</td>
                                    <td className='p-3'>{new Date(debt.date).toLocaleString()}</td>
                                    <td className='p-3'>{debt.quantity * debt.product.price}</td>
                                    <td className='p-3'>{debt.payedAmount}</td>
                                    <td className='p-3'>
                                        <button
                                            className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors'
                                            onClick={() => showEditModal(debt)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td className='p-3'>
                                        <button
                                            className='bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors'
                                            onClick={() => handleRemove(debt.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td className='p-3'>
                                        <button
                                            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'
                                            onClick={() => showPaymentModal(debt)}
                                        >
                                            Pagar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardModule>
            }
        </>
    )
}
