import { useContext } from "react";
import { SongContext } from "../song.contex";
import { getSong } from "../service/song.api";

export const useSong = () => {

  const context = useContext(SongContext);

  const { song, setSong, loading, setLoading } = context;

  const handleGetSong = async ({ mood }) => {

    try {

      setLoading(true);

      const data = await getSong({ mood });

      // backend response -> { song: {...} }
      setSong(data.song);

    } catch (error) {

      console.error("Error fetching song:", error);

    } finally {

      setLoading(false);

    }

  };

  return {
    song,
    loading,
    handleGetSong
  };

};