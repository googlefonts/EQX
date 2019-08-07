/* /pages/index.js */
import { Button, Alert } from "reactstrap";
import Layout from "../components/Layout";
export default () => {
  return (
    <Layout>
      <div>
        <Alert color="primary">
          Example text. This is in React Bootstrap. Lets use Material.
        </Alert>
        &nbsp; <Button color="primary">Hello from nextjs</Button>
      </div>
    </Layout>
  );
};