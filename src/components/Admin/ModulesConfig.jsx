import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSackXmark,faCookie } from "@fortawesome/free-solid-svg-icons"
import DebtorModule from "./DebtorModule/DebtorModule"
import ProductModule from "./ProductModule/ProductModule";
const modules =[
    {
        key:'debtors',
        title:'Debtors',    
        icon:<FontAwesomeIcon icon={faSackXmark} />,
        component:DebtorModule,
        route:'debtors'
    },
    {
        key:'products',
        title:'Products',
        icon:<FontAwesomeIcon icon={faCookie} />,
        component:ProductModule,
        route:'products'
    }
]

export default modules;