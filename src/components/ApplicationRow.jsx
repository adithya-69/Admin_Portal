import StatusBadge from "./StatusBadge";

export default function ApplicationRow({ app }) {
  return (
    <tr>
      <td>{app.id}</td>
      <td>{app.date}</td>
      <td>{app.company}</td>
      <td>{app.type}</td>
      <td>{app.role}</td>
      <td>📞 ✉️</td>
      <td><StatusBadge status={app.status} /></td>
    </tr>
  );
}
