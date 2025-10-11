package com.example.attendance.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "student_attendance_summary")
public class StudentAttendanceSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "roll_no", nullable = false)
    private String rollNo;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "batch", nullable = false)
    private String batch;

    @Column(name = "dbm_present")
    private int dbmPresent;

    @Column(name = "dbm_absent")
    private int dbmAbsent;

    @Column(name = "dbm_percentage")
    private BigDecimal dbmPercentage;

    @Column(name = "mc_present")
    private int mcPresent;

    @Column(name = "mc_absent")
    private int mcAbsent;

    @Column(name = "mc_percentage")
    private BigDecimal mcPercentage;

    @Column(name = "eft_present")
    private int eftPresent;

    @Column(name = "eft_absent")
    private int eftAbsent;

    @Column(name = "eft_percentage")
    private BigDecimal eftPercentage;

    @Column(name = "dc_present")
    private int dcPresent;

    @Column(name = "dc_absent")
    private int dcAbsent;

    @Column(name = "dc_percentage")
    private BigDecimal dcPercentage;

    @Column(name = "cn_present")
    private int cnPresent;

    @Column(name = "cn_absent")
    private int cnAbsent;

    @Column(name = "cn_percentage")
    private BigDecimal cnPercentage;

    @Column(name = "total_present")
    private int totalPresent;

    @Column(name = "total_absent")
    private int totalAbsent;

    @Column(name = "total_percentage")
    private BigDecimal totalPercentage;

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }

    public int getDbmPresent() { return dbmPresent; }
    public void setDbmPresent(int dbmPresent) { this.dbmPresent = dbmPresent; }

    public int getDbmAbsent() { return dbmAbsent; }
    public void setDbmAbsent(int dbmAbsent) { this.dbmAbsent = dbmAbsent; }

    public BigDecimal getDbmPercentage() { return dbmPercentage; }
    public void setDbmPercentage(BigDecimal dbmPercentage) { this.dbmPercentage = dbmPercentage; }

    public int getMcPresent() { return mcPresent; }
    public void setMcPresent(int mcPresent) { this.mcPresent = mcPresent; }

    public int getMcAbsent() { return mcAbsent; }
    public void setMcAbsent(int mcAbsent) { this.mcAbsent = mcAbsent; }

    public BigDecimal getMcPercentage() { return mcPercentage; }
    public void setMcPercentage(BigDecimal mcPercentage) { this.mcPercentage = mcPercentage; }

    public int getEftPresent() { return eftPresent; }
    public void setEftPresent(int eftPresent) { this.eftPresent = eftPresent; }

    public int getEftAbsent() { return eftAbsent; }
    public void setEftAbsent(int eftAbsent) { this.eftAbsent = eftAbsent; }

    public BigDecimal getEftPercentage() { return eftPercentage; }
    public void setEftPercentage(BigDecimal eftPercentage) { this.eftPercentage = eftPercentage; }

    public int getDcPresent() { return dcPresent; }
    public void setDcPresent(int dcPresent) { this.dcPresent = dcPresent; }

    public int getDcAbsent() { return dcAbsent; }
    public void setDcAbsent(int dcAbsent) { this.dcAbsent = dcAbsent; }

    public BigDecimal getDcPercentage() { return dcPercentage; }
    public void setDcPercentage(BigDecimal dcPercentage) { this.dcPercentage = dcPercentage; }

    public int getCnPresent() { return cnPresent; }
    public void setCnPresent(int cnPresent) { this.cnPresent = cnPresent; }

    public int getCnAbsent() { return cnAbsent; }
    public void setCnAbsent(int cnAbsent) { this.cnAbsent = cnAbsent; }

    public BigDecimal getCnPercentage() { return cnPercentage; }
    public void setCnPercentage(BigDecimal cnPercentage) { this.cnPercentage = cnPercentage; }

    public int getTotalPresent() { return totalPresent; }
    public void setTotalPresent(int totalPresent) { this.totalPresent = totalPresent; }

    public int getTotalAbsent() { return totalAbsent; }
    public void setTotalAbsent(int totalAbsent) { this.totalAbsent = totalAbsent; }

    public BigDecimal getTotalPercentage() { return totalPercentage; }
    public void setTotalPercentage(BigDecimal totalPercentage) { this.totalPercentage = totalPercentage; }
}
