import { useForm } from "react-hook-form";

function TaskFormPAge() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="string" placeholder="Título" {...register("title")} autoFocus/>

       <textarea rows="3" placeholder="Descripción" {...register("description")}></textarea>


      </form>
    </div>
  );
}

export default TaskFormPAge;
