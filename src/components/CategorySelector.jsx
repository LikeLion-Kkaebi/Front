import React from "react";
import styled from "styled-components";

const CategorySelector = ({ categories, selectedCategories, onToggle }) => {
  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          $isSelected={selectedCategories.includes(category)}
          onClick={() => onToggle(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default CategorySelector;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryButton = styled.button`
  padding: 20px 20px;
  border-radius: 8px;
  border: 0.5px solid ${(props) => (props.$isSelected ? "#AA91E8" : "#cecece")};
  background-color: ${(props) => (props.$isSelected ? "#E4D9FF" : "#FFF")};
  color: ${(props) => (props.$isSelected ? "#000" : "#787878")};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;
