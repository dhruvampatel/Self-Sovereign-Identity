import './Modal.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
const QRCode = require('qrcode.react');

const Modal = (props) => {

    const url = `https://chart.googleapis.com/chart?cht=qr&chl=${props.url}&chs=300x300&chld=L|1`

    return(
        <div className="modal">
            <AiOutlineCloseCircle size={40} style={{marginBottom: '10px', color: 'red', cursor: 'pointer'}}
                onClick={props.closeModal}/>
            <img src={url} width='300px' height='300px'/>
        </div>
    );
}

export default Modal;