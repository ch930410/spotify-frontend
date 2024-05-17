import { useParams } from 'react-router-dom'
import { albumsData, songsData, assets } from '@/assets/assets'
import { usePlayer } from '@/context';

export default function Album() {
  const { playWithId } = usePlayer();

  const { id } = useParams();
  const albumData = albumsData[id];
  return <>
    <div className="mt-10 flex gap-8 flex-col sm:flex-row">
      <img className="w-48 rounded" src={albumData.image} alt="" />
      <div className="flex flex-col">
        {/* <p>Playlist</p> */}
        <h2 className="text-5xl font-bold mb-4 md:text-7xl flex-1">{albumData.name}</h2>
        <h4>{albumData.desc}</h4>
        <div className="mt-1 flex items-center gap-x-2">
          <img className="w-5" src="/logo.png" alt="" />
          <b>Spotify</b>
          <div className="dot w-2 h-2 bg-white rounded-full"></div>
          1,323,154 likes
          <div className="dot w-2 h-2 bg-white rounded-full"></div>
          <b>50 songs,</b>
          about 2 hr 30min
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 md:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
      <p>
        <b className="mr-4">#</b>
        Title
      </p>
      <p className="hidden md:block text-center">Album</p>
      <p className="hidden sm:block text-center">Date Added</p>
      <img className="ml-auto w-4 col-start-3 sm:col-start-4" src={assets.clock_icon} alt="" />
    </div>
    <hr />
    {
      songsData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 md:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" onClick={() => playWithId(item.id)}>
          <div className="text-white flex flex-row">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <div className="flex flex-row">
              <img className="inline-block w-10 mr-3" src={item.image} alt="" />
              <span>{item.name}</span>
            </div>
          </div>
          <p className="text-[15px] hidden md:block text-center">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block text-center">5 days ago</p>
          <p className="text-[15px] text-right col-start-3 sm:col-start-4">{item.duration}</p>
        </div>
      ))
    }

  </>
}