import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { useUpdateSetting } from "./useUpdateSetting";
import { getSettings } from "../../services/apiSettings";

const StyledForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem 4rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 23rem 1fr;
  align-items: center;

  column-gap: 2rem;
  padding: 1.2rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Input = styled.input`
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-sm);
`;

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const { isPending, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdateSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isPending) return <div>Loading...</div>;
  return (
    <StyledForm>
      <FormRow>
        <Label>Minimum nights/bookings</Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label>Maximum nights/bookings</Label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow>
        <Label>Maximum guests/bookings</Label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow>
        <Label>Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </StyledForm>
  );
}

export default UpdateSettingsForm;
