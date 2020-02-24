import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Post = (props) =>{
    console.log('props in Post:', props)
    const [project, setProject] = useState();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/projects/${props.post.id}`)
        .then(res => setProject(res.data))
        .catch(err => console.log(err))
    },[])

   { (project) ? console.log('Project Actions:', project.tasks) : console.log('no project yet')}
    // console.log('Props Inside Post.js:', props)
    const handleDelete = (e) =>{
        console.log('deleting...', props.post)
        e.preventDefault();
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/projects/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        props.setUpdate({...props.post})
    }

    return(
        <div className='user'>
            <h5>{props.post.name}</h5>
            <p><b>Description:</b> {props.post.description}</p>
            <p>Completed: {(props.post.completed) ? 'True' : 'False'}</p>
            <button className='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
            <button onClick={(e) => handleUpdate(e)}>Update</button>
            <div className='userposts'>
                {(project) ?
                project.tasks.map(post => (
                    <div key={post.id}>
                        <h3>Tasks:</h3>
                        <li>{post.description}</li>
                        <li>{post.notes}</li>
                        <li>{post.completed}</li>
                    </div>
                )) :
                <div><h2>No Actions Available</h2></div>    
            }
            </div>
        </div>
    )
}

export default Post;