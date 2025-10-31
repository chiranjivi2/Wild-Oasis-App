import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Form from "../../ui/Form";

// const FormRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 26rem 1.2fr;
//   align-items: center;
//   column-gap: 2.4rem;
//   padding: 1.2rem 0;
//   /* align-items: center; */

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     gap: 2rem;
//     justify-content: flex-end;
//   }
// `;

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-300);
  /* justify-self: self-start; */
`;

// const Label = styled.label`
//   align-self: center;
//   font-weight: 500;
// `;

// const Error = styled.div`
//   color: red;
//   font-size: 1.4rem;
// `;

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  &::file-selector-button {
    background-color: var(--color-brand-600);
    border-radius: var(--border-radius-sm);
    border: none;
    font-weight: 500;
    color: var(--color-brand-50);
    padding: 0.8rem 1.2rem;
    margin-right: 1rem;
  }
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { cabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    // mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }
  // console.log(isCreating);
  const isWorking = isCreating || isEditing;
  // console.log(isWorking);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* <FormRow>
        <Label>Cabin Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required.",
          })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow> */}

      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "maximum capacity should be atleast 1.",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required.",
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
          })}
        />
      </FormRow>
      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="cabinImage"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
