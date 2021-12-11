import './App.css';


import ViewFileInfo from '../components/ViewFileInfo';

function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className="box">
            <h2 className="header">
                File type
            </h2>
            <ViewFileInfo
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
    );
}

export default App;