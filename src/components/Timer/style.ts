import { createUseStyles } from "react-jss";

export const useStyle = createUseStyles({
    timerBox: {
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: 220,
        background: "#f9f9f9",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      },
      button: {
        margin: "4px",
        padding: "6px 12px",
        fontSize: 14,
        cursor: "pointer",
        borderRadius: 4,
        border: "1px solid #aaa",
        backgroundColor: "pink",
        '&:hover': {
          backgroundColor: "#eee",
        },
      },
}) 