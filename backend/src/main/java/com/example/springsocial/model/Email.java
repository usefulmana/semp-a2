package com.example.springsocial.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@EntityListeners(AuditingEntityListener.class)
public class Email {
    private String from;
    private String to;
    private String subject;
    private List<Object> attachments;
    private Map<String, Object> model;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;
}
