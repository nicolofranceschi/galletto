

export default function Wrapper({ half, title, children }) {
  return (
    <div className={half ? "flex sm:w-1/2 flex-col gap-3" : "flex flex-col gap-3"}>
      {title && <h5>{title}</h5>}
      <div className={half ? "flex gap-3" : "flex flex-col sm:flex-row gap-3"}>{children}</div>
    </div>
  );
}
