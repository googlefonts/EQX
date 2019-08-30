import Layout from '../components/Layout'
import TestOverview from '../components/TestOverview'

import "../styles/main.scss"

const TestResults = props => (
  <Layout headerType="answering" progressBar={1}>
  	<TestOverview/>
  </Layout>
);

export default TestResults;