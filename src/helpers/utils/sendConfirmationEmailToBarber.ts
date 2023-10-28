import { ScheduleOutputDTO } from "@/@types/schedules";

interface sendEmailConfirmation {
  barberEmail: string;
  barberName: string;
  scheduleDetails: ScheduleOutputDTO;
}

export const sendConfirmationEmailToBarber = async ({
  barberEmail,
  barberName,
  scheduleDetails,
}: sendEmailConfirmation) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: barberEmail,
        subject: "Confirmação de Agendamento",
        text: `O agendamento para ${barberName} foi confirmado. Detalhes: ...`,
      }),
    });

    if (response.ok) {
      console.log("E-mail enviado para o barbeiro com sucesso!");
    } else {
      console.error("Erro ao enviar e-mail para o barbeiro.");
    }
  } catch (error) {
    console.error("Erro ao enviar e-mail para o barbeiro:", error);
  }
};
