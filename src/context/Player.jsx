import { createContext, useContext, useMemo, useRef, useState, useEffect } from 'react'
import { songsData } from '@/assets/assets'

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const dotRef = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  })

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  const playWithId = async (id) => {
    pause();
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = async (e) => {
    if (audioRef.current) {
      const audioNode = audioRef.current;
      audioNode.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioNode.duration);
    }
  }

  const dotMoving = (currentTime, duration) => {
    const dotNode = dotRef.current;
    const audioNode = audioRef.current;
    const seekBgNode = seekBg.current;
    const seekBarNode = seekBar.current;


    const progressBarSize = seekBgNode.getBoundingClientRect();
    const dotSize = dotNode.getBoundingClientRect();

    const progress = currentTime / duration * (progressBarSize.width - (dotSize.width / 2));

    dotNode.style.left = `${progress}px`;

    seekBarNode.style.width = `${(currentTime / duration) * 100}%`;
  }

  let startX = 0;
  let moveX = 0;
  let isTouch = false;
  let isMove = false;
  useEffect(() => {
    const progressBarSize = seekBg.current?.getBoundingClientRect();
    const dotSize = dotRef.current?.getBoundingClientRect();

    const handleMouseMove = (e) => {
      isMove = true;

      if (isMove && isTouch) {
        let x = e.pageX - progressBarSize.left - (dotSize.width / 2);
        moveX = x - startX;

        if (moveX <= 0) moveX = 0;
        if (moveX >= progressBarSize.width - (dotSize.width / 2)) {
          moveX = progressBarSize.width - (dotSize.width / 2);
        }

        dotRef.current.style.left = `${moveX}px`;
        seekBar.current.style.width = `${moveX}px`;
      }
    };

    const handleMouseUp = () => {
      isMove = false;
      isTouch = false;

      if (audioRef.current) {
        const audioNode = audioRef.current;
        audioNode.currentTime = (moveX / progressBarSize.width) * audioNode.duration
      }

      document.removeEventListener('mousemove', handleMouseMove);
    };

    dotRef.current.addEventListener('mousedown', (e) => {
      isTouch = true;

      if (!isMove) startX = e.pageX - progressBarSize.left;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dotRef, seekBg]);

  useEffect(() => {
    if (audioRef && seekBar) {
      const audioNode = audioRef.current;
      const seekBarNode = seekBar.current;

      const updateSeekBar = () => {
        if (!isMove) {
          dotMoving(audioNode.currentTime, audioNode.duration);
        }
        setTime({
          currentTime: {
            second: Math.floor(audioNode.currentTime % 60),
            minute: Math.floor(audioNode.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioNode.duration % 60),
            minute: Math.floor(audioNode.duration / 60)
          }
        });
      };

      audioNode.addEventListener('timeupdate', updateSeekBar);
      audioNode.addEventListener('canplay', (e) => {
        console.log('canplay', e);
      });

      return () => {
        audioNode.removeEventListener('timeupdate', updateSeekBar);
      };
    }

  }, [])

  // useEffect(() => {
  //   const audioNode = audioRef.current;

  //   const handleEnded = () => {
  //     console.log('播放完成', track);
  //     pause();
  //     next();
  //   };

  //   audioNode.addEventListener('ended', handleEnded);
  //   return () => {
  //     audioNode.removeEventListener('ended', handleEnded);
  //   };
  // }, [track]);



  const memoValue = useMemo(() => ({
    audioRef,
    dotRef,
    seekBg,
    seekBar,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play, pause,
    playWithId,
    previous, next,
    seekSong
  }), [track, playStatus, time])

  return <PlayerContext.Provider value={memoValue}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  return useContext(PlayerContext);
}