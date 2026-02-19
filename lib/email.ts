import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, resetLink: string) {
    await resend.emails.send({
        from: "noreply@resend.dev",
        to,
        subject: "Reset your password",
        html: `
            <p>You requested a password reset for your Ticket Bounty account.</p></br>
            <p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p></br>
            <p>If you did not request this, you can safely ignore this email.</p>
        `,
    });
}
