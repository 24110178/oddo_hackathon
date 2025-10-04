# oddo_hackathon
# 💰 Expense Management System  

## 📌 Overview  
The Expense Management System automates and streamlines reimbursement processes for organizations.  
It eliminates manual effort, reduces errors, and ensures transparency with flexible approval workflows.  

---

## 🚀 Features  

### 🔐 Authentication & User Management  
- Auto-create **Company** and **Admin** on first signup.  
- Admin can:  
  - Add Employees & Managers  
  - Assign/change roles  
  - Define manager relationships  

### 🧾 Expense Submission (Employee)  
- Submit claims with:  
  - Amount (multi-currency supported)  
  - Category, Description, Date  
- View submission history & approval status  

### ✅ Approval Workflow (Manager/Admin)  
- Multi-step approvals (e.g., Manager → Finance → Director).  
- Approve/Reject with comments.  
- Expense moves only after current approver acts.  


### 📷 OCR for Receipts  
- Upload receipt → OCR auto-extracts amount, date, vendor, category.  
- Employee can review & edit before submission.  

### 📊 Reporting (Admin)  
- View all expenses across company.  
- Filter by user, category, date, status.  
- Export data for audits.  

---

## 👥 Roles & Permissions  

| Role     | Permissions |
|----------|-------------|
| **Admin** | Manage users, roles, company, approval rules. View all expenses. Override approvals. |
| **Manager** | Approve/reject team expenses, escalate, view reports. |
| **Employee** | Submit expenses, view own history & approval status. |

---

## ⚡ APIs Used  
- 🌍 Country & Currency API → `https://restcountries.com/v3.1/all?fields=name,currencies`  
- 💱 Exchange Rate API → `https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}`  

---

## 📐 System Design  

### Entities (Data Model)  
- **User** (id, name, role, email, manager_id)  
- **Company** (id, name, country, currency)  
- **Expense** (id, amount, currency, description, category, date, employee_id, status)  
- **Approval** (id, expense_id, approver_id, status, comments, sequence)  
- **ApprovalRule** (id, type [percentage/specific/hybrid], threshold, approver_id)  

### Workflow  
1. Employee submits expense.  
2. Manager reviews (approve/reject).  
3. Moves through approval sequence or conditional flow.  
4. Final status set (Approved/Rejected).  

---
