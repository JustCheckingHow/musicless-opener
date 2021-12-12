import "bootstrap-css-only/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './App.css';

import DropFileInput from '../components/DropFileInput';
import Layout from '../layouts';

function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <Layout>
        <div className="box mx-auto">
            <DropFileInput
                upload_endpoint="http://localhost:8000/opener"
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
        </Layout>
    );
}

export default App;