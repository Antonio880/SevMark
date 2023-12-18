import { useNavigate } from "react-router-dom"

export default function AddButton(){
    
    const navigate = useNavigate();

    const fab = {
        "position": "fixed",
        'bottom':'10px',
        'right':"10px",
    }
    const button = {
        
            'cursor': 'pointer',
            'border-radius': '30px',
            'transition': 'filter 0.2s',
            'border': 'none',
            'box-shadow': '0 1px 5px rgba(0,0,0,.4)',
            'font-size': '28px',
            'color': 'white',
            "display": 'flex',
            "justify-content": 'center',
            "align-items": "center",
            'width': '60px',
            'height': '60px',
            'right': '0',
            'bottom': '0',
            'z-index': '20',
    }
    return(
        <div style={fab} className="bg-orange-400 rounded-full hover:bg-orange-500 transition ease-in-out delay-150 hover:text-white duration-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => {navigate("/create-location")}}>
            <button style={button}>+</button>
        </div>
    )
}