

function EnterName(props: { name:string; setName:React.Dispatch<React.SetStateAction<string>>}){
    return (<input type="text" placeholder="enter your name" value={props.name} onChange={e=>props.setName(e.target.value)}></input>)
}

export default EnterName