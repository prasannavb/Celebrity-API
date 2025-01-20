//React
import { useState, useRef} from "react";
import axios from 'axios'

//css
import "./App.css"

const App=()=>
{
    const[people,Setpeople]=useState([]);
    const[celebrity,Setceleb]=useState({name:" ",age:" ",dob:" ",gender:" ",nationality:" ",occupation:[],networth:" "});
    const[count,Setcount]=useState(false);
    const inp=useRef();
    const API_KEY = import.meta.env.VITE_API_KEY

    const Handle=(e)=>
    {
        const {name,value}=e.target;
        inp.current=value;
    }

    const FetchData=async()=>{
    const {data}=await axios({url: 'https://api.api-ninjas.com/v1/celebrity?name=' + inp.current,headers: {'X-Api-Key':API_KEY }})
    if(data.length==1)
    {
        Setcount(true);
        Setceleb({...celebrity,name:data[0].name,age:data[0].age,dob:data[0].birthday,gender:data[0].gender,nationality:data[0].nationality,occupation:data[0].occupation,networth:data[0].net_worth})
    }
    else if(data.length > 1)
    {
        Setcount(false);
        Setpeople(data);
    }
    else
    {
        alert("Celebrity doesnt exist")
    }
}

return(
    <section className="section">
        
        <div className="input">
            <h1 className="title"> CELEBRITY API</h1>
            <input type="text" className="input-field" name="input-field" onChange={Handle} placeholder="Enter the celebrity name"/>
            <button className="fetch" onClick={FetchData}>Fetch</button>
        </div>
        {count?(<div className="card">
            <div className="card-input">Name: {celebrity.name}</div>
            <div className="card-input">Age: {celebrity.age ?? "N/A"}</div>
            <div className="card-input">Date of Birth: {celebrity.dob ?? "N/A"}</div>
            <div className="card-input">Gender: {celebrity.gender ?? "N/A"}</div>
            <div className="card-input">Nationality: {celebrity.nationality ?? "N/A"}</div>
            <div className="card-input">Networth: {celebrity.networth ?? "N/A"}</div>
            <div className="card-input">Occupation: {celebrity.occupation ?? "N/A"}</div>
        </div>):(<div className="card-rack">
            {people.map((data,index)=>{
            return(<div className="card" key={index}>
            <div className="card-input" >Name: {data.name}</div>
            <div className="card-input" >Age: {data.age ?? "N/A"}</div>
            <div className="card-input" >Date of Birth: {data.birthday ?? "N/A"}</div>
            <div className="card-input" >Gender: {data.gender ?? "N/A"}</div>
            <div className="card-input" >Nationality: {data.nationality ?? "N/A"}</div>
            <div className="card-input" >Networth: {data.net_worth ?? "N/A"}</div>
            <div className="card-input" >Occupation: { `${data.occupation}`+" " ?? "N/A"}</div>
            </div>)
            
            })}
        </div>)}
        <div className="self">
            <p className="self-content">Hey there! I'm Prasanna V B, and this is my first ever project! This website uses the <mark>Celebrity Api</mark> to get data. You can enter the name of the celebrity in the search box  and fetch the details about celebrity.</p>
        </div>
    </section>
)
}
export default App;

