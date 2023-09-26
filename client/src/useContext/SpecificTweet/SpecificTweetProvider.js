import { createContext,useState } from "react"
export const SpecificTweets = createContext()

export const SpecificTweetProvider = ({children})=>{
    const [specifictweet, setSpecifictweet] = useState()
    return (
        <SpecificTweets.Provider value={[specifictweet, setSpecifictweet]}>
            {children}
        </SpecificTweets.Provider>
    )
}