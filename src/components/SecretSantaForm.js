import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import "./SecretSantaForm.css";

const SecretSantaForm = ({ onAddParticipant, onDraw }) => {
  const { register, handleSubmit, reset } = useForm();
  const handleFormSubmit = async (data) => {
    const serviceId = "service_3a07zrt";
    const templateId = "template_ysq6ixk";
    const userId = "GKSKDSXVGJjesicB4";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { to_name: data.name, from_name: "Secret Santa", drawName: data.name },
        userId
      );
      onAddParticipant(data);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        Name:
        <input {...register("name")} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" {...register("email")} required />
      </label>
      <br />
      <button type="submit">Add Participant</button>
      <button type="button" onClick={onDraw}>
        Draw Secret Santa
      </button>
    </form>
  );
};

export default SecretSantaForm;
