import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const Form = styled.form`
  padding: 3rem;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
`;

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

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("new cabin created successfully.");
      queryClient.invalidateQueries();
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
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
      <FormRow label="Cabin Photo">
        <FileInput id="cabinImage" accept="image/*" {...register("image")} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Create new Cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
