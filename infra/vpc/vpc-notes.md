# VPC Networking Notes

## VPC
- **Name:** banking-vpc
- **CIDR:** 10.0.0.0/16
- **Region:** eu-west-2

---

## Subnets

### Public Subnets
| Name               | CIDR         | AZ           | Route Table     |
|--------------------|--------------|--------------|------------------|
| public-subnet-a    | 10.0.2.0/24  | eu-north-1a   | rt-public        |
| public-subnet-b    | 10.0.1.0/24  | eu-north-1b   | rt-public        |

### Private App Subnets
| Name               | CIDR          | AZ           | Route Table        |
|--------------------|---------------|--------------|---------------------|
| private-app-subnet-a | 10.0.11.0/24 | eu-north-1a   | rt-private-app      |
| private-app-subnet-b | 10.0.12.0/24 | eu-north-1b   | rt-private-app      |

### Private DB Subnets
| Name               | CIDR          | AZ           | Route Table       |
|--------------------|---------------|--------------|--------------------|
| private-db-subnet-a | 10.0.21.0/24 | eu-north-1a   | rt-private-db      |
| private-db-subnet-b | 10.0.22.0/24 | eu-north-1b   | rt-private-db      |

---

## Route Tables

### rt-public
- Associated subnets: `public-subnet-a`, `public-subnet-b`
- Routes:
  - `10.0.0.0/16 → local`
  - `0.0.0.0/0 → banking-igw`

### rt-private-app
- Associated subnets: `private-app-subnet-a`, `private-app-subnet-b`
- Routes:
  - `10.0.0.0/16 → local`
  - `0.0.0.0/0 → nat-gateway-in-public-a`

### rt-private-db
- Associated subnets: `private-db-subnet-a`, `private-db-subnet-b`
- Routes:
  - `10.0.0.0/16 → local`
  - **NO route to internet** (no IGW, no NAT)

---

## Internet Gateway
- **Name:** banking-igw
- Attached to: banking-vpc

## NAT Gateway
- Lives in: `public-subnet-a`
- Used by: rt-private-app