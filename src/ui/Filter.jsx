import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  background-color: aliceblue;
  padding: 0.6rem;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-0);

  display: flex;
  gap: 0.6rem;
`;
const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  font-size: 1.4rem;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: var(--border-radius-sm);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("filterValue") || "all";

  function handleClick(value) {
    searchParams.set("filterValue", value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      <FilterButton
        onClick={() => handleClick("all")}
        active={currentFilter === "all"}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("no-discount")}
        active={currentFilter === "no-discount"}
      >
        No discount
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("with-discount")}
        active={currentFilter === "with-discount"}
      >
        With discount
      </FilterButton>
    </StyledFilter>
  );
}

export default Filter;
