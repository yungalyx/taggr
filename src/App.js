import logo from './logo.svg';
import './App.css';
import { Spinner, Intent, InputGroup, Icon, NonIdealState } from "@blueprintjs/core"
import React, {useState, useMemo, useEffect} from 'react';
import { FileViewer } from './components/fileviewer';
import { NavBar } from './components/navbar';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'


const fs = window.require('fs')
const pathModule = window.require('path')
const { constructFileFromLocalFileData, LocalFileData } = window.require("get-file-object-from-local-path")

const ffmpeg = createFFmpeg({ log: true})

function App() {


  const [path, setPath] = useState("")
  const [search, setSearch] = useState("")
  const [video, setVideoFile] = useState("")
  const [videoPath, setVFP] = useState("")

  const onBack = () => setPath(pathModule.dirname(path))
  const onOpen = folder => setPath(pathModule.join(path, folder))
  
  const onSelectFile = async(file) => {
    setVFP(pathModule.join(path, file))
    const fileData = new LocalFileData(pathModule.join(path, file))
    console.log(fileData)
    const obj = constructFileFromLocalFileData(fileData)
    // const obj = await window.electron.getFileObject2(pathModule.join(path, file))
    console.log(obj)
    
    //const obj = await window.api.getFileObject2(pathModule.join(path, file))
    //console.log(obj)
    
    //console.log(currentFile)
    //ffmpeg.FS('writeFile', 'current.mp4', await fetchFile())
  }

  const [files, setFiles] = useState([])
  const [filteredFiles, setFF] = useState([])



  
  // localStorage for getting default module
  useEffect(() => {
    const fol = localStorage.getItem("taggr-last-opened-folder")
    setPath(JSON.parse(fol))
  }, [])

  useEffect(() => {
    try {
      const d = fs.readdirSync(path).map(file => {
        const stats = fs.statSync(pathModule.join(path, file))
        return {
          name: file, 
          size: stats.isFile() ? stats.size ?? 0 : null,
          directory: stats.isDirectory()
        }
      })
      .sort((a, b) => {
        if (a.directory === b.directory) {
           return a.name.localeCompare(b.name)
        }
        return a.directory ? -1: 1
      })

      
      setFiles(d)
    } catch (err) {
      console.log(err)
      setFiles([])
    }
  }, [path])



  const onChange = (e) => {
    if (e.target.files.length > 1) {
      var file = e.target.files[0];
      //console.log(fs.stats(file))
      setPath(pathModule.dirname(file.path))
      localStorage.setItem("taggr-last-opened-folder", JSON.stringify(pathModule.dirname(file.path)))
      setSearch("")
  
    } else {
      console.log(e.target)
    }
  
    var file = e.target.files[0];
  
    console.log(file)
    // var reader = new FileReader();
    // reader.onload = function(e) {
    //   console.log(e.target.result)
    // }
  }


  useEffect(() => {
    let v = files.filter(s => {return s.name.startsWith(search)})
    setFF(v)

  }, [files, search])


  useEffect(() => {
    // console.log(video)
  }, [video])

  return (
    <div class='multipage'>
      <NavBar />
      {path ? 
      <div class='filepage'>

        <InputGroup
          large={true}
          leftIcon="filter"
          value={search}
          type="text"
          placeholder="Filter files"
          onChange={event => setSearch(event.target.value)}
        />

        {filteredFiles.length > 0 ?
          <FileViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} onSelectFile={onSelectFile} /> 
          :
          <NonIdealState
            icon="search"
            title="No Search results"
            description="Your search didn't match any files. Try searching for something else, or select a different folder."
          />
        }
      </div>
      :
      <div class='filepage'>
        <h3> Taggr </h3>
        <input type="file" webkitdirectory="" directory="" accept="video/*,.mp4" onChange={(e) => onChange(e)}/>
      </div>
      }
      <div class="videopage">
        {/* {path && <video controls src={URL.createObjectURL(pathModule.join(path, video))}>
          Your browser does not support HTML5 video.
        </video>} */}
       
      </div>
     
    </div>
  );
}

export default App;
