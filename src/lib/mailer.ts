import { verifyTransporter, sendMail, transporter } from "../utils/mailer";
import * as fs from "fs";
import * as path from "path";
import hbs from "nodemailer-express-handlebars";

interface EmailOptions {
    email: string;
    username: string;
    token: string
}

const hbsOptions: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
       defaultLayout: false
    },
    viewPath: path.join(__dirname, '../../public/views') // Directory where your email templates are located
};

transporter.use("compile", hbs(hbsOptions));

async function sendConfirmationEmail({ email, username, token }: EmailOptions): Promise<{ error: boolean, errorMessage: string }> {
    let verify: boolean;
    try {
        verify = await verifyTransporter();
    } catch (error: unknown) {
        console.log(error);
        return { error: true, errorMessage: (error as Error).message };
    }

    if (!verify) return { error: true, errorMessage: "" };

    const mailOptions = {
        from: {
            name: "Book Store",
            address: process.env.MAIL_USERNAME as string,
        },
        to: email,
        subject: "Nodemailer Project",
        template: "confirmation_email",
        context: {
            username: username,
            token: token
        }
    };

    try {
        await sendMail(mailOptions);
        return { error: false, errorMessage: "" };
    } catch (error) {
        return { error: true, errorMessage: (error as Error).message };
    }
}


async function sendAdminRequest({ email, username, token }: EmailOptions): Promise<{ error: boolean, errorMessage: string }> {
    let verify: boolean;
    try {
        verify = await verifyTransporter();
    } catch (error: unknown) {
        console.log(error);
        return { error: true, errorMessage: (error as Error).message };
    }

    if (!verify) return { error: true, errorMessage: "" };

    const mailOptions = {
        from: {
            name: "Book Store",
            address: process.env.MAIL_USERNAME as string,
        },
        to: email,
        subject: "Nodemailer Project",
        template: "request_admin",
        context: {
            username: username,
            token: token
        }
    };

    try {
        await sendMail(mailOptions);
        return { error: false, errorMessage: "" };
    } catch (error) {
        return { error: true, errorMessage: (error as Error).message };
    }
}

async function sendResetTokenMail(email: string, username: string, token: string): Promise<{ error: boolean, errorMessage: string }> {
    let verify: boolean;
    try {
        verify = await verifyTransporter();
    } catch (error) {
        console.log(error);
        return { error: true, errorMessage: (error as Error).message };
    }

   

    const mailOptions = {
        from: {
            name: "Book store",
            address: process.env.MAIL_USERNAME as string
        },
        to: email,
        subject: 'Password Reset Request',
        template: "reset_password",  // This is the template
        context: {
            token: token,
            username: username
        }
    };

    try {
        await sendMail(mailOptions);
        return { error: false, errorMessage: "" };
    } catch (error) {
        return { error: true, errorMessage: (error as Error).message };
    }
}

async function passwordResetConfirmedMail(email: string, username: string): Promise<{ error: boolean, errorMessage: string }> {
    let verify: boolean;
    try {
        verify = await verifyTransporter();
    } catch (error) {
        console.log(error);
        return { error: true, errorMessage: (error as Error).message };
    }

    if (!verify) return { error: true, errorMessage: "" };

    const mailOptions = {
        from: {
            name: "Book store",
            address: process.env.MAIL_USERNAME as string
        },
        to: email,
        subject: 'Password Reset',
        text: `Hi ${username},\n\nYour password has been reset. You can now log into your account.\n\nIf you did not request a password reset and got this mail, please contact us at our direct line to issue a complaint .\n`
    };

    try {
        await sendMail(mailOptions);
        console.log("Email sent successfully");
        return { error: false, errorMessage: "" };
    } catch (error) {
        console.log("Error ", error);
        return { error: true, errorMessage: (error as Error).message };
    }
}

export { sendConfirmationEmail, sendResetTokenMail, passwordResetConfirmedMail, sendAdminRequest };
