import React from 'react'

export default function SideButton({ title, icon }) {
    return (
        <div className='flex'>
            <div>
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )
}
