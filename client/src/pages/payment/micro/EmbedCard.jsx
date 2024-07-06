const EmbedCard = ({
  title,
  content,
  footer,
  side,
  borderColor,
  borderWidth,
  bgColor,
}) => {
  // set default side to left, color to black and border width to 4, title = 'Title' and content = 'Content'
  side = side || "left";
  borderColor = borderColor || "black";
  borderWidth = borderWidth || 2;
  title = title || "Title";
  content = content || "Content";
  footer = footer || "";
  bgColor = bgColor || "#f0f0f0";

  const cardStyle = {
    [`border${
      side.charAt(0).toUpperCase() + side.slice(1)
    }`]: `${borderWidth}px solid ${borderColor}`,
    // borderRadius: "1px",
    margin: "10px",
    padding: "10px",
    textAlign: side,
    backgroundColor: bgColor,
  };

  return (
    <div style={cardStyle}>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-text">{content}</div>
      </div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};

export default EmbedCard;
