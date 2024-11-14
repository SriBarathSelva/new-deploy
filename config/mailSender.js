const nodemailer = require('nodemailer');
const Token = require('../models/tokenModel');
const bcrypt = require('bcryptjs');

module.exports = async (data, mailType) => {
    try {
        const mailConfig = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.VERIFY_MAIL,
                pass: process.env.VERIFY_PASS, 
            },
        });

        // Generate and save token
        const verifyToken =await bcrypt.hashSync(data._id.toString(), 10).replaceAll('/', '');
        const token = new Token({ userid: data._id, token: verifyToken });
        await token.save();

        // Email content
        const context = `<div><h1>Please verify your email by clicking this link</h1>
        <br/>
        <a href="https://localhost:5173/verify/${verifyToken}">Click this Link</a>
        </div>`;

        let mailOptions;
        switch (mailType) {
            case 'verify-mail':
                mailOptions = {
                    from: process.env.VERIFY_MAIL,
                    to: data.email,
                    subject: "Verify your email for Resume Builder Application",
                    html: context
                };
                break;
            case 'update-mail':
                mailOptions = {
                    from: process.env.VERIFY_MAIL,
                    to: data.email,
                    subject: "Your account details have been updated",
                    text: "Your password has been successfully updated."
                };
                break;
            default:
                throw new Error("Invalid mail type");
        }

        await mailConfig.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
