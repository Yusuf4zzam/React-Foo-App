export default function Button({ children, classes, ...props }) {
  classes === "button" ? (classes = "button") : (classes = "text-button");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
