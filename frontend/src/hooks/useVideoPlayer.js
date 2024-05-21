import { useState, useRef, useEffect } from "react";

/* Author: CodingNepal
Date: 27 Jul 2022
Title of source code: Build A Custom Video Player in HTML CSS & JavaScript
Type: source code
Web address: https://www.youtube.com/watch?v=-r9TTW0D3t4&ab_channel=CodingNepal */
const useVideoPlayer = (videoRef) => {
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState(0);

  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoTimelineRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeSliderRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => {
      const controls = document.querySelector(".video-container");
      controls.classList.add("show-controls");
      clearTimeout(timer);
      hideControls();
    };

    let timer;
    const hideControls = () => {
      if (!videoRef.current.paused) {
        timer = setTimeout(() => {
          const controls = document.querySelector(".video-container");
          controls.classList.remove("show-controls");
        }, 3000);
      }
    };

    hideControls();

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [videoRef]);

  const formatTime = (time) => {
    let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours === 0) {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    const percent = (videoRef.current.currentTime / duration) * 100;
    progressBarRef.current.style.width = `${percent}%`;
  };

  const handleLoadedData = () => {
    setDuration(videoRef.current.duration);
  };

  const handleProgressBarClick = (e) => {
    const timelineWidth = e.target.clientWidth;
    videoRef.current.currentTime =
      (e.nativeEvent.offsetX / timelineWidth) * duration;
  };

  const handleTimelineMouseMove = (e) => {
    const progressTime = videoTimelineRef.current.querySelector("span");
    const offsetX = e.nativeEvent.offsetX;
    const timelineWidth = videoTimelineRef.current.clientWidth;
    const percent = (offsetX / timelineWidth) * videoRef.current.duration;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);

    if (isDragging) {
      progressBarRef.current.style.width = `${e.nativeEvent.offsetX}px`;
      videoRef.current.currentTime =
        (e.nativeEvent.offsetX / timelineWidth) * duration;
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Left
  const handleVolumeClick = () => {
    if (videoRef.current.volume > 0) {
      setVolume(0);
      videoRef.current.volume = 0;
    } else {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  };

  // Center
  const handleSkipBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const handleSkipForward = () => {
    videoRef.current.currentTime += 5;
  };

  //Right
  const handleSpeedBtnClick = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  const handleSpeedOptionClick = (speed) => {
    setActiveSpeed(speed);
    setShowSpeedOptions(false);
    videoRef.current.playbackRate = speed; 
  };

  const handlePicInPic = () => {
    videoRef.current.requestPictureInPicture();
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.querySelector(".video-container").requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return {
    volume,
    currentTime,
    duration,
    activeSpeed,
    showSpeedOptions,
    isFullScreen,
    videoTimelineRef,
    progressBarRef,
    volumeSliderRef,
    formatTime,
    handleTimeUpdate,
    handleLoadedData,
    handleProgressBarClick,
    handleMouseDown,
    handleMouseUp,
    handleTimelineMouseMove,
    handleVolumeClick,
    handleVolumeChange,
    handleSkipBackward,
    handleSkipForward,
    handleSpeedBtnClick,
    handleSpeedOptionClick,
    handlePicInPic,
    handleFullScreen,
  };
};

export default useVideoPlayer;
