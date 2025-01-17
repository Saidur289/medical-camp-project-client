import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const handleSignUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const handleSingIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUser = (updatedData) => {
        // setLoading(true)
        return updateProfile(auth.currentUser, updatedData)
    }
    const handleLoginGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const authInfo = {
        handleSignUp,
        handleSingIn,
        handleSignOut,
        user,
        setUser,
        updateUser,
        handleLoginGoogle,
        loading
    }
    useEffect(() => {
const unSubscribe = onAuthStateChanged(auth, async currentUser => {
    // console.log('current user', currentUser);
            if(currentUser?.email){
                setUser(currentUser)
                // get jwt token
             await   axiosPublic.post('/jwt', {email: currentUser?.email}, {withCredentials: true})
             setLoading(false)

            }
            else{
                setUser(currentUser)
                await axiosPublic.get('/logout', {withCredentials: true} )
                setLoading(false)
            }
           
        })
        return () => {
            unSubscribe()
        }
    }, [])
  
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;