import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSackXmark,faCookie } from "@fortawesome/free-solid-svg-icons"
import DebtorModule from "./DebtorModule/DebtorModule"
import ProductModule from "./ProductModule/ProductModule";
import DebtModule from "./DebtModule/DebtModule";
import DebtPaymentModule from "./DebtPaymentModule/DebtPaymentModule";
const modules =[
    {
        key:'debtors',
        title:'Deudores',    
        icon:<FontAwesomeIcon icon={faSackXmark} />,
        component:DebtorModule,
        route:'debtors'
    },
    {
        key:'products',
        title:'Productos',
        icon:<FontAwesomeIcon icon={faCookie} />,
        component:ProductModule,
        route:'products'
    },
    {
        key:'debts',
        title:'Deudas',    
        icon:<FontAwesomeIcon icon={faSackXmark} />,
        component:DebtModule,
        route:'debts'
    },
    {
        key:'payments',
        title:'Pagos',
        icon:<FontAwesomeIcon icon={faSackXmark} />,
        component:DebtPaymentModule,
        route:'payments'
    }
]

export default modules;