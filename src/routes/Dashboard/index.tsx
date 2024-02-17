import TitleBar from '../../components/TitleBar';
import Settings from './routes/Settings';

function Dashboard() {

  return (
    <div className="dashboardWindow">
      <TitleBar />
      <div data-tauri-drag-region style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Settings />
      </div>
    </div >
  );
}

export default Dashboard;
