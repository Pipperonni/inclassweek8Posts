import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Post from '../components/Post'
import React from 'react';
import { DataContext } from "../contexts/DataProvider";


export default function PostSingle(){
    const { id, uid } = useParams()
    const [post, setPost] = useState({})
    const [error, setError] = useState(false)
    const { getPost } = useContext(DataContext)

    useEffect(() => {
        async function handleLoad(){
            try{
                const data = await getPost(uid, id)
                setPost(data)
            } catch(err){
                setError(true)
                console.log(err)
            }
        }
        handleLoad()
    }, [])

    return(
        <div>
        <h1>Post Single {id}</h1>
        {
        error ?
        <h1>404 - Not Found!</h1> :
        <></>
        }
        <Post post={post} hideLink={true}/>
        </div>
    )
}

