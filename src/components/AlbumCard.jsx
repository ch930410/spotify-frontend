import { assets } from '@/assets/assets';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '@/context';

export const AlbumCard = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  const { playWithId } = usePlayer();
  return <div className="min-w-[180px] p-2 rounded cursor-pointer hover:bg-[#ffffff26]"
    onClick={() => {
      navigate(`/album/${id}`)
      // playWithId(id);
    }}>
    <img className="rounded" src={image} alt={name} />
    <p className="font-bold mt-2 mb-1">{name}</p>
    <p className="text-slate-200 text-sm">{desc}</p>
  </div>
}