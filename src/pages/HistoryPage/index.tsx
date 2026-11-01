import { useHistory } from "../../context/HistoryContext"

export default function HistoryPage() {
  const { entries } = useHistory()

  return (
    <section>
      <h2>היסטוריית חיפושים</h2>

      {entries.length === 0 ? (
        <p>עדיין לא בוצעו חיפושים.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">תאריך ושעה</th>
                <th scope="col">יישוב</th>
                <th scope="col">מדינה</th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    {new Date(entry.searchedAt).toLocaleString("he-IL")}
                  </td>
                  <td>{entry.city}</td>
                  <td>{entry.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}