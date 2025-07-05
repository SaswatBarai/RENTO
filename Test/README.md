# Test Data Documentation

## User Passwords

All users in `User.json` have the same password for testing purposes:

**Plain Text Password:** `Password123!`

### User Account Details:

| User ID | Name | Email | Role | Plain Password |
|---------|------|-------|------|----------------|
| 66e1a2b3c4d5e6f708901234 | John Smith | john.smith@example.com | user | Password123! |
| 66e1a2b3c4d5e6f708901235 | Jane Doe | jane.doe@example.com | user | Password123! |
| 66e1a2b3c4d5e6f708901236 | Michael Johnson | michael.johnson@example.com | user | Password123! |
| 66e1a2b3c4d5e6f708901237 | Emily Williams | emily.williams@example.com | user | Password123! |
| 66e1a2b3c4d5e6f708901238 | Robert Brown | robert.brown@example.com | user | Password123! |
| 66e1a2b3c4d5e6f708901239 | Sarah Miller | sarah.miller@example.com | user | Password123! |
| 66e1a2b3c4d5e6f70890123a | David Wilson | david.wilson@example.com | user | Password123! |
| 66e1a2b3c4d5e6f70890123b | Jennifer Taylor | jennifer.taylor@example.com | user | Password123! |
| 66e1a2b3c4d5e6f70890123c | William Davis | william.davis@example.com | **admin** | Password123! |
| 66e1a2b3c4d5e6f70890123d | Lisa Anderson | lisa.anderson@example.com | **admin** | Password123! |

## Test Data Summary

### Users (10 total)
- **8 regular users** with role: "user"
- **2 admin users** with role: "admin"
- All passwords are bcrypt hashed with 10 salt rounds

### Vehicles (20 total)
- **13 cars** (Toyota, Honda, BMW, Chevrolet, Audi, Volvo, Tesla, Nissan, Hyundai, Subaru, Lexus)
- **5 bikes** (Harley-Davidson, Ducati, Kawasaki, Yamaha, Triumph)
- **2 trucks** (Ford F-150, Dodge Ram 1500)
- **2 buses** (Mercedes Sprinter, MAN Lion's Coach)

### Bookings (12 total)
- Various statuses: confirmed, completed, pending, cancelled
- Different payment methods: credit_card, debit_card, paypal, cash
- Payment statuses: paid, pending, failed

## For API Testing

Use the email and plain password `Password123!` for authentication testing.

Example login request:
```json
{
  "email": "john.smith@example.com",
  "password": "Password123!"
}
```

The bcrypt hashed passwords in the JSON files will match this plain text password when compared using bcrypt.compare().
