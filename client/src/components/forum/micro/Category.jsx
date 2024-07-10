import Skeleton from "react-loading-skeleton"; // Assuming you have this component for loading state
import PropTypes from "prop-types";

const Category = ({ category }) => {
  if (!category)
    return (
      <div>
        <Skeleton count={.1}/>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: `#${category.bgColor}`,
        color: `#${category.fgColor}`,
        borderRadius: "5px",
        padding: "5px",
        width: "fit-content",
      }}
    >
      {category.name}
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired, // or PropTypes.number.isRequired, depending on the data type
};

export default Category;
