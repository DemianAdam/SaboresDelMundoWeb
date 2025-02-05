import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSackXmark } from "@fortawesome/free-solid-svg-icons"
import DebtorModule from "./DebtorsModule/DebtorModule"
const modules =[
    {
        key:'debtors',
        title:'Debtors',
        icon:<FontAwesomeIcon icon={faSackXmark} />,
        component:DebtorModule,
        route:'debtors'
    }
]

export default modules;