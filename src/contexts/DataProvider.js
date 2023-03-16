import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, getDoc, doc, addDoc, Timestamp, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function(props){
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    console.log(posts)
    useEffect(() => {
        async function getPosts(){
            const postQuery = query(collectionGroup(db, 'posts'))
            const querySnapshot = await getDocs(postQuery) 
            const loadedPosts = []
            querySnapshot.forEach((doc) => {
                console.log(doc.ref.parent.parent)

                loadedPosts.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setPosts(loadedPosts)
            
            // const response =await fetch('https://cdn109-fakebook.onrender.com/api/posts')
            // const data = await response.json()
            // setPosts(data)
        }
        getPosts()
    }, [])

    async function getPost(uid, id){
        const docRef = doc(db, 'users', uid, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        throw new Error('No such document exists.')
        }
        return docSnap.data()


            // const response = await fetch(`https://cdn109-fakebook.onrender.com/api/post/${id}`)
            // const data = await response.json()
            // return data
    }

    

    
        async function getPokemonData(pokemonID){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            const data = await response.json()
            return data
        }

        async function addPost(title, body){
            const newPost = {
                title,
                body,
                dateCreated: Timestamp.now(),
                username: user.displayName
            }

            const docRef = await addDoc(collection(db, 'users', user.uid, "posts"), newPost)
            
            newPost.id = docRef.id

            setPosts([
                newPost,
                ...posts
            ])
            
            return newPost
        }
    
        const value = {
            posts,
            getPost,
            getPokemonData,
            addPost
        }
        
    


    return(
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}