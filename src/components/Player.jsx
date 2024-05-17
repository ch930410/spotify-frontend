import { songsData, assets } from '@/assets/assets';
import { usePlayer } from '@/context';

export const Player = () => {
  const { seekBar, seekBg, dotRef, playStatus, track, time, play, pause, previous, next, seekSong } = usePlayer();

  return <div className="h-[10%] bg-black flex justify-between items-center text-white lg:px-4">
    <div className="hidden lg:flex items-center gap-4">
      <img className="w-12 rounded-md" src={track.image} alt="" />
      <div>
        <p>{track.name}</p>
        <p>{track.desc.slice(0, 12)}</p>
      </div>
    </div>
    <div className="flex flex-col items-center gap-1 m-auto">
      <div className="flex gap-4">
        <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
        <img onClick={() => previous()} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />

        <img
          onClick={() => {
            playStatus ? pause() : play()
          }}
          src={!playStatus ? assets.play_icon : assets.pause_icon}
          className="w-4 cursor-pointer"
          alt=""
        />
        <img onClick={() => next()} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
        <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
      </div>
      <div className="flex items-center gap-5">
        <p>{time.currentTime.minute}:{time.currentTime.second}</p>
        <div ref={seekBg} onClick={seekSong} className="w-[60vw] relative max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
          <hr ref={seekBar} className="h-1 border-none w-[0%] bg-green-800 rounded-full transition-all" />
          <div ref={dotRef} className="dot w-[8px] h-[8px] rounded-full bg-white absolute left-[0%] top-[50%] translate-y-[-50%]"></div>
        </div>
        <p>{time.totalTime.minute}:{time.totalTime.second}</p>
      </div>
    </div>
    <div className="hidden lg:flex items-center gap-2 opacity-75">
      <img className="w-4" src={assets.plays_icon} alt="" />
      <img className="w-4" src={assets.mic_icon} alt="" />
      <img className="w-4" src={assets.queue_icon} alt="" />
      <img className="w-4" src={assets.speaker_icon} alt="" />
      <img className="w-4" src={assets.volume_icon} alt="" />
      <hr className="w-20 bg-slate-50 h-1 rounded cursor-pointer" />
      <img className="w-4" src={assets.zoom_icon} alt="" />
    </div>
  </div>
}