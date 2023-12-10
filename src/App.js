import React, { useState } from "react";
import "./App.css";
import SecretSantaForm from "./components/SecretSantaForm";
import emailjs from "emailjs-com";

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [drawResults, setDrawResults] = useState([]);

  const handleAddParticipant = (data) => {
    setParticipants([...participants, data]);
  };

  const handleDrawSecretSanta = () => {
    const shuffledParticipants = [...participants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [
        shuffledParticipants[j],
        shuffledParticipants[i],
      ];
    }

    const updatedDrawResults = shuffledParticipants.map(
      (participant, index) => ({
        ...participant,
        drawName:
          shuffledParticipants[
            index === shuffledParticipants.length - 1 ? 0 : index + 1
          ].name,
      })
    );

    setDrawResults(updatedDrawResults);
    sendEmails(updatedDrawResults);
  };

  const sendEmails = (drawResults) => {
    drawResults.forEach((result) => {
      const { name, drawName } = result;
      const serviceId = "service_3a07zrt";
      const templateId = "template_ysq6ixk";
      const userId = "GKSKDSXVGJjesicB4";

      emailjs
        .send(
          serviceId,
          templateId,
          { to_name: name, from_name: "Secret Santa", drawName },
          userId
        )
        .then(() => {
          console.log(`Email sent to ${name}`);
        })
        .catch((error) => {
          console.error(`Error sending email to ${name}:`, error);
        });
    });
  };

  return (
    <div>
      <h1>Secret Santa Generator</h1>
      <SecretSantaForm
        onAddParticipant={handleAddParticipant}
        onDraw={handleDrawSecretSanta}
      />
    </div>
  );
};

export default App;
