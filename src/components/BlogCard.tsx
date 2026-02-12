type Props = {
  title: string
  date: string
}

export default function BlogCard({ title, date }: Props) {
  return (
    <div style={{
      background: "var(--surface0)",
      padding: "1.5rem",
      borderRadius: "12px",
      marginBottom: "1rem"
    }}>
      <h3>{title}</h3>
      <p style={{ color: "var(--subtext)", fontSize: "0.9rem" }}>
        {date}
      </p>
    </div>
  )
}
