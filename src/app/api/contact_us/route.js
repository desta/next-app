import { prisma } from '@/libs/prisma';
import { decrypt } from '@/utils/ChiperText';
import { NextResponse, NextRequest } from 'next/server'
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

// Handles POST requests to /api


export async function POST(req) {

    const smtp = await prisma.smtp.findUnique({
        where:{
            id:0
        }
    })

    const decode = decrypt(smtp.password)
    // const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    // const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    // const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    const alamatemail = smtp.alamatemail
    const password = decode
    const host = smtp.host
    const port = smtp.port
    const dashboardemail = smtp.dashboardemail

    

    const { name, email, subject, message } = await req.json()

    // const formData = await request.formData()
    // const name = formData.get('name')
    // const email = formData.get('email')
    // const message = formData.get('message')


    // create transporter object
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: true,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            user: alamatemail,
            pass: password
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: alamatemail,
            to: dashboardemail,
            replyTo: email,
            subject: `Website activity from ${subject}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }


}