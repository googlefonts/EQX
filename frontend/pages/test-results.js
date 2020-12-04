import Layout from '../components/Layout'
import TestOverview from '../components/TestResults/TestOverview'
import UserCompletion from '../components/TestResults/UserCompletion'

// import "../styles/main.scss"

const TestResults = props => (
  <Layout headerType="answering" progressBar={1}>
  	<TestOverview/>
  	<UserCompletion/>
  </Layout>
);

export default TestResults;