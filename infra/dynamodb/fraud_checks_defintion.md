# DynamoDB: fraud_checks table

## Table Purpose
Stores fraud evaluation results for each transaction processed by the payments-service → SQS → Lambda fraud-checker pipeline.

## Keys
- **Partition key:** `transactionId` (String)

Each transaction ID appears once — one fraud result per transaction.

## Example Item

```json
{
  "transactionId": "123",
  "riskLevel": "HIGH",
  "riskScore": 90,
  "reason": "Amount > 1000 GBP",
  "checkedAt": "2025-01-01T12:00:00Z"
}


## Access Patterns
- **Lambda (writer):** Inserts fraud decision into the table.
- **transactions-service (reader):** Queries table to return fraud result for `/transactions/{id}/fraud-status`.