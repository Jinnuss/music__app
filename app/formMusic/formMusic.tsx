import { useState, useRef, useEffect } from "react";
import DataMussic from "../dataMusic/dataMusic"
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdOutlineQueueMusic } from "react-icons/md";
import Image from "next/image";


export default function FormMusic() {
    const [active, setActive] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const data = DataMussic();
    const [per, setPer] = useState(100);
    const [play, setPlay] = useState(false);
    const [dataMusic, setData] = useState(data[0]);
    const [currentMusic, setMusic] = useState('/Believer-ImagineDragons-5564250.mp3');
    const [index, setindex] = useState(0);
    const [dem, setdem] = useState(0);
    const handleClickPlay = () => {
        if (play) {
            if (audioRef.current !== null) {
                audioRef.current.pause();
            }
            setPlay(false);
        } else {
            if (audioRef.current !== null) {
                audioRef.current.play();
            }
            setPlay(true);
        }
    }
    const nextRight = () => {
        const item = data[(index + 1) % data.length];
        setActive((index + 1) % data.length);
        setindex((index + 1) % data.length);
        setData(item);
        setMusic(item.link);
        if (audioRef.current !== null) {
            audioRef.current.play();
        }
    }
    const nextLeft = () => {
        const item = data[(index + data.length - 1) % data.length];
        setindex((index + data.length - 1) % data.length);
        setActive((index + data.length - 1) % data.length);
        setData(item);
        setMusic(item.link);
        if (audioRef.current !== null) {
            audioRef.current.play();
        }
    }
    const handleChangeVolume = (e: any) => {
        setPer(e.target.value);
        const volume = e.target.value;
        if (audioRef.current !== null) {
            audioRef.current.volume = parseFloat(volume) / 100;
        }

    }
    const handleClickMusic = (item: any, index: any) => {
        setActive(index);
        setindex(index);
        setData(item);
        setMusic(item.link);
        if (audioRef.current !== null) {
            audioRef.current.play();
        }
        if (play == false) {
            setPlay(true);
        }
    }
    useEffect(() => {
        if (audioRef.current !== null) {
            let currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (currentTime == duration) {
                nextRight();
            }
            setdem(dem + 1);

        }
    }, [dem]);

    return (
        <>
            <div className="bg-[#1e1c29]">
                <div className="flex justify-center pt-[30px]">
                    <div className="top w-[60%] lg:flex justify-center">
                        <div className="top-opa1"></div>
                        <div className="top-opa2"></div>
                        <div className="top-left lg:pr-[10%] sm:mb-[20px]">
                            <img className="w-[300px] h-[300px]" src={dataMusic.img} alt="abc" />
                        </div>
                        <div className="top__right text-[#c77dff] pl-[10%] text-center">
                            <div className="my-[40px]">Now playing</div>
                            <div className="mb-[40px]">{dataMusic.name}</div>
                            <div className="mb-[40px]">{dataMusic.singer}</div>
                        </div>
                    </div>
                </div>
                <div className="bottom flex justify-center">
                    <div className="bottom_content w-[60%]">
                        <div className="flex justify-center mt-[70px] invisible	">
                            <input defaultValue={0} min={0} max={100} type="range" className="w-[60%] h-2 bg-gray-200 rounded-lg" />
                        </div>
                        <div className="flex justify-center mt-[10px] text-[50px] h-[50px]">
                            <FaChevronCircleLeft className="icon" onClick={nextLeft} />
                            <div className="mx-[20px]" onClick={() => handleClickPlay()}>
                                {play ? (<FaPauseCircle className="icon" />) : (<FaPlayCircle className="icon" />)}
                            </div>
                            <FaChevronCircleRight className="icon" onClick={nextRight} />
                        </div>
                        <div className="flex justify-center items-center ml-[20px] my-[30px] lg:text-[24px]">
                            <IoVolumeHighSharp className="text-[#5a3ec8]" />
                            <input onChange={() => handleChangeVolume(event)} defaultValue={100} min={0} max={100} type="range" className="mx-[10px] lg:w-[10%] h-2 bg-gray-200 rounded-lg" />
                            <div className="text-[#5a3ec8] w-[70px]">
                                {per} %
                            </div>
                        </div>
                    </div>

                </div>
                <div className="listMusic flex justify-center w-[100%]">
                    <div className="content py-[40px] w-[60%]">
                        <div className="trackList flex w-[100%] items-center">
                            <MdOutlineQueueMusic /> Tracks list
                        </div>
                        <div className="listMusic">
                            {data.map((item, index) => (
                                <div key={index} className={active == index ? "lg:mx-[50px] my-[20px] itemMusic active" : "lg:mx-[50px] my-[20px] itemMusic"} onClick={() => handleClickMusic(data[index], index)}>
                                    <div className="text-[#c77dff] lg:text-[20px] flex justify-between">
                                        <div className="">{item.name}</div>
                                        <div className="font-bold">{item.singer}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <audio ref={audioRef} src={currentMusic} autoPlay></audio>
                    </div>
                </div>
            </div>

        </>
    )
}