import './App.css';



function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <ViewFileInfo 
            onFileChange={(files) => onFileChange(files)}
        />
    );
}

export default App;