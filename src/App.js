import { useState } from 'react'
import './App.css';

function App() {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('')
  const [resolution, setResolution] = useState('Select Resolution')
  const [convertedFileurl, setConvertedFileurl] = useState('')

  const updateFileInfo = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
    setFilename(e.target.files[0].filename)
  }

  const updateSelectedResolution = (e) => {
    e.preventDefault()
    setResolution(e.target.value)
  }

  const convertImage = async (e) => {
    e.preventDefault()
    setConvertedFileurl('')
    let formData = new FormData()
    formData.append('resolution', resolution)
    formData.append('file', file)
    const res = await fetch('https://machx-assignment-server.herokuapp.com', {
      method: 'POST',
      body: formData
    });
    res.json()
    .then(data => setConvertedFileurl(data.url))
    .catch(err => console.log({err}))
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={convertImage}>
          <div><input type='file' value={filename} onChange={updateFileInfo} className="input-field"/></div>
          <div><select value={resolution} onChange={updateSelectedResolution} className="drop-dwn">
            <option value="Select Resolution" disabled>Select Resolution</option>
            <option value="10x10">10x10</option>
            <option value="20x20">20x20</option>
            <option value="30x30">30x30</option>
          </select></div>
          <button className="btn btn-primary m-3">Generate Thumbnail</button>
        </form>
        <a href={convertedFileurl}>{convertedFileurl}</a>
      </div>
    </div>
  );
}

export default App;
