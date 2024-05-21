import React, { useEffect } from "react";
import video from "../assets/video.mp4";
import useVideoPlayer from "../hooks/useVideoPlayer";

/* Author: Suraj Vishwakarma
Date: 6 Jan 2023
Title of source code: Building a Video Player in React
Type: source code
Web address: https://dev.to/documatic/building-a-video-player-in-react-1mlf */

const VideoPlayer = React.forwardRef(
  ({ onTimeUpdate, onPlayPause, isPlaying }, ref) => {
    const {
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
    } = useVideoPlayer(ref);

    useEffect(() => {
      const currentRef = ref.current;
      if (currentRef) {
        currentRef.addEventListener("timeupdate", onTimeUpdate);
        return () => {
          currentRef.removeEventListener("timeupdate", onTimeUpdate);
        };
      }
    }, [onTimeUpdate, ref]);

    return (
      <div
        className={`video-container ${isFullScreen ? "fullscreen" : ""}`}
        onMouseUp={handleMouseUp}
      >
        <h1>Videoplayers mit einer Quizfunktion</h1>
        <div className="wrapper">
          <div
            className="video-timeline"
            ref={videoTimelineRef}
            onClick={handleProgressBarClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleTimelineMouseMove}
          >
            <div className="progress-area">
              <span>{formatTime(currentTime)}</span>
              <div className="progress-bar" ref={progressBarRef}></div>
            </div>
          </div>
          <ul className="video-controls">
            <li className="options left">
              <button className="volume" onClick={handleVolumeClick}>
                <i
                  className={`fa-solid ${
                    volume > 0 ? "fa-volume-high" : "fa-volume-xmark"
                  }`}
                ></i>
              </button>
              <input
                id="volume-slider"
                type="range"
                ref={volumeSliderRef}
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={handleVolumeChange}
              />
              <div className="video-timer">
                <p className="current-time">{formatTime(currentTime)}</p>
                <p className="separator">/</p>
                <p className="video-duration">{formatTime(duration)}</p>
              </div>
            </li>
            <li className="options center">
              <button className="skip-backward" onClick={handleSkipBackward}>
                <i className="fas fa-backward"></i>
              </button>
              <button className="play-pause" onClick={onPlayPause}>
                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
              </button>
              <button className="skip-forward" onClick={handleSkipForward}>
                <i className="fas fa-forward"></i>
              </button>
            </li>
            <li className="options right">
              <div className="playback-content">
                <button
                  className="playback-speed"
                  onClick={handleSpeedBtnClick}
                >
                  <span className="material-symbols-rounded">
                    slow_motion_video
                  </span>
                </button>
                {showSpeedOptions && (
                  <ul className="speed-options">
                    {[2, 1.5, 1, 0.75, 0.5].map((speed) => (
                      <li
                        key={speed}
                        className={activeSpeed === speed ? "active" : ""}
                        onClick={() => handleSpeedOptionClick(speed)}
                      >
                        {speed}x
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="pic-in-pic" onClick={handlePicInPic}>
                <span className="material-icons">picture_in_picture_alt</span>
              </button>
              <button className="fullscreen" onClick={handleFullScreen}>
                <i
                  className={`fa-solid ${
                    isFullScreen ? "fa-compress" : "fa-expand"
                  }`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
        <video
          ref={ref}
          src={video}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
        ></video>
      </div>
    );
  }
);

export default VideoPlayer;
