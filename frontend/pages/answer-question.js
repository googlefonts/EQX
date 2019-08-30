import Layout from '../components/Layout'
import AnswerQuestionFields from '../components/AnswerQuestionFields'

import "../styles/main.scss"

const AnswerQuestion = props => (
  <Layout headerType="answering">
  	<AnswerQuestionFields/>
  </Layout>
);

export default AnswerQuestion;