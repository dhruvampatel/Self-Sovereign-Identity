import {useEffect, useState} from 'react';
import './home.css';
import Modal from '../Modal/Modal';
const fetch = require('node-fetch');
const QRCode = require('qrcode.react');

const Home = () => {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [id, setId] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(!qrCodeUrl) return;
        setShowModal(true);
    },[qrCodeUrl]);

    const submitPressed = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BASE_URL}/generate`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                name: name,
                grade: grade,
                id: id,
                course: course,
                year: year
            })
        }).then(res => {
            if(res.ok){
                return res.json();   
            } else{

            }
        }).then(res => {
            console.log(res);
            setQrCodeUrl(res.credential.offerUrl);
        }).catch(err => console.error(err));
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const verifyPressed = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/verify`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            }
        }).then(res => {
            if(res.ok){
                return res.json();   
            } else{

            }
        }).then(res => {
            console.log(res);
            setQrCodeUrl(res.credential.offerUrl);
        }).catch(err => console.error(err));
    }

    return(
        <div className="body">
            <span className="heading">GBC Certificate Issue Portal</span>
            {/* Certificate issuing controls */}
            <div className="issue">
            <span style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>Create credentials</span>
                <form className="form" onSubmit={submitPressed}>
                    <label>Student name</label><br />
                    <input 
                        type="text" 
                        placeholder="Enter student name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value.trim())}
                        className="controls"/><br />
                    <label>Student grade</label><br />
                    <input 
                        type="number" 
                        placeholder="Enter student grade (1.0 - 4.0)" 
                        value={grade} 
                        onChange={(e) => setGrade(e.target.value.trim())}
                        className="controls"/><br />
                    <label>Student id</label><br />
                    <input 
                        type="number" 
                        placeholder="Enter student id" 
                        value={id} 
                        onChange={(e) => setId(e.target.value.trim())}
                        className="controls"/><br />
                    <label>Course</label><br />
                    <input 
                        type="text" 
                        placeholder="Enter course name" 
                        value={course} 
                        onChange={(e) => setCourse(e.target.value.trim())}
                        className="controls"/><br />
                    <label>Course year</label><br />
                    <input 
                        type="number" 
                        placeholder="Enter course year" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value.trim())}
                        className="controls"/><br />
                    <input type='submit' value='Generate' className='button'/>
                </form>
            </div>
            {/* Modal to display QR code */}
            {showModal ? <Modal url={qrCodeUrl} closeModal={closeModal}/> : null}

            {/* Verify creentials */}
            <div className='issue'>
                <span style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>Verify credentials</span>
                <button className='button'
                    onClick={verifyPressed}>Verify</button>
                <span className='result'>Name: </span>
                <span className='result'>Grade: </span>
                <span className='result'>Student id: </span>
                <span className='result'>Course: </span>
                <span className='result'>Year: </span>
            </div>
        </div>
    );
};

export default Home;