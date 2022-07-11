import './KeyValueTable.css';

function KeyValueTable({ keyValuePairs }) {

  return (
    <table className="key-value-table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(keyValuePairs).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{JSON.stringify(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default KeyValueTable;
