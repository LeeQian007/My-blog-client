"use client";
import { useSoundModal } from "@/hooks/use-sound-store";
import { Volume2, VolumeX } from "lucide-react";
import React, { useRef } from "react";

type Props = {};

const MuteSound = (props: Props) => {
  // const [musicOn, setMusicOn] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);

  const { isOpen, onClose, type, onOpen } = useSoundModal();

  const musicOn = isOpen && type === "musicOn";

  function toggleAudio(): void {
    if (musicOn) {
      musicRef.current?.pause();
      onClose("musicOn");
    } else {
      musicRef.current?.play();
      onOpen("musicOn");
    }
  }

  const soundRef = useRef(null);

  return (
    <button onClick={toggleAudio} ref={soundRef}>
      {musicOn ? <Volume2 /> : <VolumeX />}

      {/* music */}
      <audio src="/song-01.mp3" ref={musicRef} loop></audio>
    </button>
  );
};

export default MuteSound;
