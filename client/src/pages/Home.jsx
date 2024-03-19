import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore'; 


const Home = () => {
   
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const { data, isFetching, error } = useGetTopChartsQuery();

    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />;
  

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className='font-bold text-3xl text-white text-left'>
                    Top Songs 
                </h2>
            </div>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.map((song, i) => (
              <SongCard
                 key={song.key}
                 song={song}
                 isPlaying={isPlaying}
                 activeSong={activeSong}
                 data={data}
                 i={i}
              />
             ))}
            </div>

        </div>
    )
}

export default Home;

const styles ={
    container:`flex flex-col`,
    wrapper:`w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10`,
    selectStyles:`bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5`
}