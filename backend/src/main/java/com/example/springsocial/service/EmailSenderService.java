package com.example.springsocial.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import com.example.springsocial.model.Email;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    public EmailSenderService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(SimpleMailMessage email){
        javaMailSender.send(email);
    }

    public void sendSimpleMessage(Email mail) throws MessagingException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());
        Context context = new Context();
        context.setVariables(mail.getModel());
        String html = templateEngine.process("token-email", context);

        helper.setTo(mail.getTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());
        javaMailSender.send(message);
    }
}
