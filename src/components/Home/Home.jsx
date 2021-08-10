import {useEffect, useState} from 'react';
import './home.css';
import Modal from '../Modal/Modal';
const fetch = require('node-fetch');

const Home = () => {

    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [id, setId] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if(qrCodeUrl === null) return;
        setShowModal(true);
    },[qrCodeUrl]);

    useEffect(() => {
        if(result === null) return;

        console.log(result);
    },[result]);

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
        setQrCodeUrl(null);
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
            setQrCodeUrl(res.verification.verificationRequestUrl);
            setTimeout(() => {
                fetchResult(res.verification.verificationId);
            }, 10000);
        }).catch(err => console.error(err));
    }

    const fetchResult = (verificationId) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/result`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                id: verificationId
            })
        }).then(res => {
            if(res.ok){
                return res.json();   
            } else{

            }
        }).then(res => {
            console.log(res);
            setResult(res.verification.proof.Transcript.attributes);
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
                {result !== null ? 
                    <div>
                        <span className='result'>Name: {result.name}</span><br />
                        <span className='result'>Grade: {result.grade}</span><br />
                        <span className='result'>Student id: {result.student_id}</span><br />
                        <span className='result'>Course: {result.course}</span><br />
                        <span className='result'>Year: {result.year}</span>
                    </div> 
                    : null
                }
            </div>
        </div>
    );
};

export default Home;