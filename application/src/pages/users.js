import React from 'react'
import {db, auth} from '../components/firebase'

class Users extends React.Component{
    componentDidMount(){
        db.collection('studies/com.alternova.example/users').get().then((res)=>{
            console.log(res);
        })
    }
    render(){
        return (
            <div>

            </div>
        )
    }
}

export default Users