import './App.css';


import DropFileInput from '../components/DropFileInput';
import Layout from '../layouts';

function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <Layout>
        <div className="box">
            <h2 className="header">
                Opener
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
        </Layout>
    );
}

export default App;