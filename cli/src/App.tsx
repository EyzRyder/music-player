import { useEffect, useState } from 'react';
import './App.scss'
import useGet from './hooks/useGet'
import { PlayCircleIcon, EyeIcon, EyeSlashIcon, ChevronUpDownIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'


function App() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [title, setTitle] = useState("Titulo");
  const [artist, setArtist] = useState("Artista");
  const [img, setImg] = useState("https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80");
  const { dataPage, isPending, error } = useGet("/api/matetags", url);

  const [downActive, setDownActive] = useState(false);
  const [activeEye, setActiveEye] = useState(false);


  useEffect(() => {
    console.log(dataPage);
    if (dataPage === null || url === '') {
      setTitle("Titulo");
      setArtist("Artista");
      setImg("https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
      return
    }
    setTitle(dataPage["title"])
    setArtist(dataPage["artist"])
    setImg(dataPage["img"])
  }, [url, dataPage])

  return (
    <div className="appContent">
      <iframe src={url && "https://www.youtube.com/embed/" + url.slice(32)} className='z-[0] fixed top-0 left-0 w-full h-full'></iframe>

      <div className='search-Wrapper'>
        <div className='search'>
          <input type="text" placeholder='Cole link de youtube' value={url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} />
          <PaperAirplaneIcon className='h-6 w-6 text-black'/>
        </div>
      </div>

      <div className='player-wrapper'>
        <div className={('player') + (downActive ? " minimize" : "") + (activeEye ? " hidden" : "")}>
          <img src={img} alt="" />
          <h2>{title}</h2>
          <h3>{artist}</h3>

          <div className="controls">
            <div className="prev">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
              </svg>
            </div>
            <div className="play">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="next">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
              </svg>
            </div>
          </div>

          <div className="track-time">
            <div className="track"></div>
            <div className="time">
              <div className="total-time">3:20</div>
              <div className="last-time">0:12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="visibility">
        {!activeEye && <EyeIcon className="eye" onClick={() => {
          setActiveEye(current => !current);
        }} />}

        {activeEye && <EyeSlashIcon className="eye" onClick={() => {
          setActiveEye(current => !current);
        }} />}

        <PlayCircleIcon className="btn-play-video" />
        <ChevronUpDownIcon id="btn-minimize" onClick={() => {
          setDownActive(current => !current);
        }}/>
      </div>
      {error && <div>{error}</div>}
      {/* {!isPending && <div className='bg-white w-40 h-40 fixed left-0 m-auto'></div>} */}

    </div>
  )
}

export default App
