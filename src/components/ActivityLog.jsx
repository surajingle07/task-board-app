export default function ActivityLog({ logs }) {
  return (
    <div style={styles.container}>
      <h3>Activity Log</h3>

      {logs.length === 0 ? (
        <p style={{ color: "#888" }}>No activity yet</p>
      ) : (
        logs.slice(0, 10).map((log, index) => (
          <div key={index} style={styles.logItem}>
            <p>{log.message}</p>
            <small>{new Date(log.time).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    margin: "0 20px",
    marginTop: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    padding: "15px",
    background: "skyblue",
    borderRadius: "10px",
    width: "400px",
  },
  logItem: {
    borderBottom: "3px solid #ddd",
    padding: "10px 0",
  },
};
