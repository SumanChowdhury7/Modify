import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({Children})=>{
    const [song, setSong] = useState({
  "url": "https://ik.imagekit.io/s2tzitpfn/moodify/songs/Asuran__Hindi__pXz7LmZIV.mp3",
  "posterUrl": "https://ik.imagekit.io/s2tzitpfn/moodify/posters/Asuran__Hindi__p1Uafrkc_.jpeg",
  "title": "Asuran (Hindi)",
  "mood": "happy",
  "__v": 0
})

const [loading, setLoading] = useState(false)
return (
<SongContext.Provider value={{loading, setLoading, song, setSong}}>
    {Children}
</SongContext.Provider>
)
}

