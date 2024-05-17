import { Navbar, AlbumCard } from "@/components"
import { albumsData, songsData } from "@/assets/assets"
export default function () {
  return <div>
    <div className="mb-4">
      <h1 className="mt-5 mb-3 font-bold text-2xl">Featured Charts</h1>
      <div className="flex overflow-auto">
        {albumsData.map((item, index) => (<AlbumCard key={index} id={item.id} name={item.name} desc={item.desc} image={item.image} />))}
      </div>
    </div>

    <div className="mb-4">
      <h1 className="mt-5 mb-3 font-bold text-2xl">Today's biggest hits</h1>
      <div className="flex overflow-auto">
        {songsData.map((item, index) => (<AlbumCard key={index} id={item.id} name={item.name} desc={item.desc} image={item.image} />))}
      </div>
    </div>
  </div>
}