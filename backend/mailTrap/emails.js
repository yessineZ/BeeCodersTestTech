import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    console.log(recipient);
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Account Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("hereIsTheCode",verificationToken),
            category: "Email Verification",
        });

        console.log('Email sent successfully:', response); // Logging the response

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error("Failed to send verification email");
    }
};


export const sendWelcomeEmail = async (email,name,companyName) => {
    const recipient = [{email}] ; 

    try {
        const response = await mailtrapClient.send({
            from : sender , 
            to : recipient ,
            template_uuid : "2db4bcd8-e41e-4e3a-8074-e28e99851c2e",
            template_variables : {
                "{name}" : name , 
                "{companyName}" : companyName
            }
        })
        
    }catch(err) {
    console.error('Error sending email:', error);
        throw new Error("Failed to send welcome email");
    }
}

export const forgetPassword = async (email,name,resetToken) => {
    const recipient = [{email}] ; 
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Password Reset Request",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace('{userName}',name).replace('{resetURL}',resetToken) ,
            category : "forgetPassword"
        });

    }catch(err) {
        console.log(err.message) ; 
        throw new Error("Failed to send forget password email"); 

    }
}


export const PasswordChangedSuccessfully = async (email,username) => {
    const recipient = [{email}] ; 
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : "Password Changed Successfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{userName}',username),
            category : "passwordChanged"
        })
    }catch(err) {
        console.log(err.message) ; 
        throw new Error("Failed to send password changed email");
    }
}
