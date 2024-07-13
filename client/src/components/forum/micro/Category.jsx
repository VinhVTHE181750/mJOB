import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Category = ({ category, width }) => {
  // const setSearchCategory = (e) => {
  //   e.stopPropagation();
  //   console.log(category.name);
  // };

  if (!category)
    return (
      <div>
        <Skeleton count={0.1} />
      </div>
    );

  return (
    <div
      className="border post-category"
      style={{
        backgroundColor: `#${category.bgColor}`,
        color: `#${category.fgColor}`,
        borderRadius: "5px",
        padding: "10px",
        width: width || "fit-content",
      }}
      // onClick={(e) => setSearchCategory(e)}
    >
      {category.name}
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object,
  width: PropTypes.number,
};

export default Category;
