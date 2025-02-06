import React from 'react'
import CardModule from '../CardModule'
import axiosInstance from '../../../../services/axios/axiosInstance';
import { useEffect, useState } from 'react';

export default function DebtorModule() {
  const [debtors, setDebtors] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";

    axiosInstance.get(api, {
      params: {
        endpoint: '/debtor/getAll',
        token: localStorage.getItem('token')
      }
    })
      .then(res => {
        setDebtors(res.data.debtors)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const api = "https://script.google.com/macros/s/AKfycbz4e_XHxEDIQ7b0GHO3TrPsnnl1GMtRfVjvuvsaX6Ot-EMtWbuC1FTQRTXXFYUFCUtM/exec";
    const debtor = {
      name: e.target.name.value,
    }
    const requestObj = {
      endpoint: '/debtor/add',
      data: {
        debtor
      },
      token: localStorage.getItem('token')
    }
    setLoading(true)
    axiosInstance.post(api, JSON.stringify(requestObj))
      .then(res => {
        setDebtors([...debtors, res.data.debtor])
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
      endpoint: '/debtor/remove',
      data: {
        id
      },
      token: localStorage.getItem('token')
    }
    setLoading(true)
    axiosInstance.post(api, JSON.stringify(requestObj))
      .then(res => {
        setDebtors(debtors.filter(debtor => debtor.id !== id))
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
        <h2 className="text-2xl text-center pb-2 mb-3 border-b border-neutral-500">Añadir Deudor</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="name" className="text-start text-xl">
            Nombre
          </label>
          <input
            type="text"
            id="name"
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
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                debtors.map((debtor, index) => (
                  <tr key={debtor.id} className='border-b border-neutral-500'>
                    <td>{index + 1}</td>
                    <td>{debtor.name}</td>
                    <td>
                      <button className='bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors'>Editar</button>
                    </td>
                    <td>
                      <button className='bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors' onClick={() => handleRemove(debtor.id)} >Eliminar</button>
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
