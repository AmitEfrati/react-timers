import { createUseStyles } from "react-jss";

export const useTimersListStyles = createUseStyles({
    container: {
        textAlign: "center",
        padding: 24,
        maxWidth: 800,
        margin: "0 auto",
      },
      addButton: {
        padding: "10px 20px",
        fontSize: 16,
        borderRadius: 6,
        border: "1px solid #aaa",
        background: "pink",
        color: "black",
        marginBottom: 20,
        cursor: "pointer",
        '&:hover': {
          background: "#eee",
        },
      },
})