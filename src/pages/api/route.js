import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function POST({ request }) {
  try {
    const data = await request.json();
    const mailerSend = new MailerSend({
      apiKey: import.meta.env.MAILERSEND_API_KEY,
    });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const message = `
    <body style=" background-color: #f4f4f4;">
  <div style="max-width: 600px; ; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);  font-family: Arial, sans-serif; color: #333;">
    <h2 style="background-color: #ff7d12; color: white ;  padding:10px 0px; text-align: center; border-radius: 6px; ">
      New Customer query
    </h2>
    <p ><strong>Date and Time:</strong></p>
    <p style="color: #2e7d32; font-size: 12px; font-weight: bold; ">${formattedDate}</p>
    <p ><strong>From:</strong></p>
    <p >${data.name}  </p>
    <p style="font-weight:700; font-size:12px ">${data.email}</p>
  
    
    <h3 style="text-align: center; font-size: 14px; font-weight: 700;">Message</h3>
    <p style="line-height: 1.8;">${
      data.message || "No description provided."
    }</p>
  </div>
</body>

    `;

    const sentFrom = new Sender(
      import.meta.env.MAILERSEND_FROM_EMAIL,
      "Customer Query"
    );
    const recipients = [
      new Recipient(
        import.meta.env.MAILERSEND_TO_EMAIL,
        import.meta.env.MAILERSEND_RECIEVER_NAME
      ),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setHtml(message)
      .setSubject(`query : ${data.category} `);

    await mailerSend.email.send(emailParams);

    return new Response(
      JSON.stringify({
        message:
          "Thank you for reaching out! We have received your Query and will get back to you shortly.",
        ok: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message:
          "We encountered an issue on our end. Please try again later. We apologize for the inconvenience.",
        ok: false,
      }),
      { status: 500 }
    );
  }
}
