import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function App() {
    const [workerData, setWorkerData] = useState([])

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [position, setPosition] = useState("")
    const [salary, setSalary] = useState("")

    const [change, setChange] = useState(Number)


    function addWorker() {
        if(name !== "" && age)
        Axios.post(`http://localhost:3001/create`, {
            name: name,
            age: age,
            city: city,
            position: position,
            salary: salary
        }).then((res) => {
            setWorkerData([...workerData, res.data])
            showWorker()
            setName("")
            setAge("")
            setCity("")
            setPosition("")
            setSalary("")
        })
    }

    function showWorker() {
        Axios.get("http://localhost:3001/show").then((res) => {
            setWorkerData(res.data)
        })
    }

    function deleteWorker(e) {
        const id = e.target.id
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
            showWorker()

        })
    }

    useEffect(() => {
        showWorker()
        
    }, [])

    function toggleChange(num){
        setChange(num)
    }

    function changeWorker(e) {
        const id = e.target.id
    
        Axios.put(`http://localhost:3001/change/${id}`, {
            id: id,
            name: name,
            age: age,
            city: city,
            position: position,
            salary: salary
        }).then(() => {
            showWorker()
        })
    }

   
    return (
        <div>

            <div className='div-mysql-express-inputs'>
                <input type={"text"} value={name}  onChange={(e) => { setName(e.target.value) }} placeholder="Enter full name" />
                <input type={"text"} value={age}  onChange={(e) => { setAge(e.target.value) }} placeholder="Enter age" />
                <input type={"text"} value={city}  onChange={(e) => { setCity(e.target.value) }} placeholder="Enter city" />
                <input type={"text"} value={position}  onChange={(e) => { setPosition(e.target.value) }} placeholder="Enter position" />
                <input type={"text"} value={salary}   onChange={(e) => { setSalary(e.target.value) }} placeholder="Enter salary" />
                <button className='button-add-worker'  onClick={addWorker}>Add Worker</button>
            </div>

            <div>
                {workerData.map((worker, index) => {


                    return <div key={index} className="worker-span-name-div">
                       
                        <span className='span1'>Name: {change === worker.id &&  salary !== 0 ?<input onChange={(e) => { setName(e.target.value) }} value={name} type={"text"}/>:worker.name }</span>
                        <span className='span2'>Age: {change === worker.id &&  salary !== 0 ?<input style={{width:"50px"}}  onChange={(e) => { setAge(e.target.value) }} value={age} type={"text"}/>:worker.age}</span>
                        <span className='span3'>City: {change === worker.id &&  salary !== 0 ?<input style={{width:"100px"}} onChange={(e) => { setCity(e.target.value) }} value={city} type={"text"}/>:worker.city}</span>
                        <span className='span4'>Position: {change === worker.id &&  salary !== 0 ?<input onChange={(e) => { setPosition(e.target.value) }} value={position} type={"text"}/>:worker.position}</span>
                        <span className='span5'>Salary: {change === worker.id &&  salary !== 0 ?<input style={{width:"60px"}} onChange={(e) => { setSalary(e.target.value) }} value={salary} type={"text"}/>:worker.salary} din</span>
                        <button  id={worker.id} onClick={deleteWorker}>Delete</button>
                        <button  id={worker.id} onClick={(e) => {
                            
                          toggleChange(worker.id)
                            changeWorker(e)
                            setName(worker.name)
                            setAge(worker.age)
                            setCity(worker.city)
                            setPosition(worker.position)
                            setSalary(worker.salary)
                            console.log(worker.salary)
                        }}>{change === worker.id &&  salary !== 0 ?'Save':'Change'}</button>

                    </div>


                })}
            </div>

        </div>
    )
}
