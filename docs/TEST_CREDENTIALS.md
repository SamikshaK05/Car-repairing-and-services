# Car Repairing and Services — Test Credentials & Account Reference

> [!IMPORTANT]  
> **LOCAL DEVELOPMENT / TESTING ONLY**  
> These credentials are provided solely for local testing and demonstration. Never use simple passwords or test credentials in production environments.

---

## Service Manager Test Account

| Role | Email | Password | Assigned Service Center | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`SERVICE_MANAGER`** | `servicemanager.test@carfix.com` | `Manager123!` | CarFix Pune – Baner Hub | Service Manager booking dispatch, mechanic assignment, status progression, and invoice management testing. |

---

## Mechanic Test Account

| Role | Email | Password | Assigned Service Center | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`MECHANIC`** | `mechanic.test@carfix.com` | `Mechanic123!` | CarFix Pune – Baner Hub | Mechanic assigned job queue, service status updates, work notes logging, and PDF invoice testing. |

---

## Customer Test Account

| Role | Email | Password | Scope | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`CUSTOMER`** | `customer.test@carfix.com` | `Customer123!` | Personal Vehicles & Bookings | Customer vehicle creation, service booking, cancellation, service history, and PDF invoice downloads. |

---

## Admin Test Account

| Role | Email | Password | Scope | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **`ADMIN`** | `admin.test@carfix.com` | `Admin123!` | System-wide | Full administrative access to users, service centers, catalog items, and analytics. |

---

## Setup / Reset Test Accounts Script

To populate or reset these dedicated test accounts in your local MongoDB database, run:

```bash
cd backend
node setup_test_service_manager.js
```
