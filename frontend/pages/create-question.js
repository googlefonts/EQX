import Layout from '../components/Layout'
import EditorImagesImport from '../components/EditorImagesImport'
import CreateQuestionFields from '../components/CreateQuestionFields'

import "../styles/main.scss"

const Index = props => (
  <Layout>
  	<CreateQuestionFields/>
    <EditorImagesImport/>
  </Layout>
);

export default Index;