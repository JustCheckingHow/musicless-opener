import './App.css';
import Layout from '../layouts';

function ViewFileInfo() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <Layout>
        <ViewFileInfo 
            onFileChange={(files) => onFileChange(files)}
        />
        </Layout>
    );
}

export default ViewFileInfo;
