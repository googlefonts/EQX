import Layout from '../components/Layout'
import AnswerQuestionFields from '../components/AnswerQuestionFields'

import "../styles/main.scss"

const AnswerQuestion = props => (
  <Layout headerType="answering" progressBar={0.32}>
  	<AnswerQuestionFields/>
  </Layout>
);

export default AnswerQuestion;