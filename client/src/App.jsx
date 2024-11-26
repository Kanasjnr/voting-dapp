import "./config/connection";
import Layout from "./components/Layout";
import "./index.css";
import CreaeteVotingModal from "./components/CreateVotingModal";
import Proposal from "./components/Proposal";
import Proposals from "./components/Proposals";

const App = () => {
  return (
    <Layout>
      <CreaeteVotingModal/>
      <Proposals />
      <Proposal/>
    </Layout>
  );
};

export default App;
