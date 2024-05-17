import { useEffect } from 'react';

// ffmpeg  https://blog.csdn.net/m0_37624402/article/details/125123818

export default function Video() {
  useEffect(() => {
    // 监听屏幕方向
    window.addEventListener('orientationchange', () => {
      if (window.orientation === 0 || window.orientation === 180) {
        // 竖屏
        console.log('竖屏');
      }
      if (window.orientation === 90 || window.orientation === -90) {
        // 横屏
        console.log('横屏');
        // 在微信浏览器里可能会横屏失败，需要延迟300s后 再全屏设置
      }
    });

    window.addEventListener('resize', () => {
      // 获取当前窗口的宽度和高度
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 检查屏幕的旋转方向
      if (screenWidth > screenHeight) {
        // 横屏
        console.log('横屏');
      } else {
        // 竖屏
        console.log('竖屏');
      }
    });


    video.addEventListener('waiting', (){
      console.log('waiting...')
    })

    video.addEventListener('play', (){
      console.log('play...')
    })

    video.addEventListener('playing', (){
      console.log('playing...')
    })

    video.addEventListener('canplay', (){
      console.log('play...')
    })

    video.addEventListener('ended', (){
      console.log('play...')
    })


  }, [])


  return <div>


    {/* 
      poster:  指定视频的封面图像
      playsinline: 指示视频在内联播放时是否应该在全屏模式下播放，而不是全屏模式

      -webkit-media-controls-enclosure{display:none} css属性，隐藏video标签的控制显示
    */}
    <video src="" poster="/logo.png" playsinline X-webkit-airplay="allow"></video>

  </div>
}