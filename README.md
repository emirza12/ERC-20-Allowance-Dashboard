# Kiln Allowance Manager

A web application developed as part of the Junior Fullstack Case Study internship at Kiln. This project demonstrates the implementation of a secure and user-friendly interface for managing ERC-20 token allowances on the Holesky network.

## 🌟 Overview

This application allows users to:
- Track multiple ERC20 token approvals in one dashboard
- Monitor allowance amounts in real-time
- Add new allowances to track
- Remove allowances from dashboard (without modifying blockchain state)
- View all approvals once connected

## 🔑 Key Features

### Adding Allowances
- Only valid ERC20 contracts are accepted
- Duplicate allowances are prevented (based on contract, owner, and spender addresses)
- Can track allowances for any owner address (not just connected wallet)

### Managing Allowances
When owner address is the connected wallet:
- Can modify allowance amount
- Can revoke allowance (set to zero)
- Can remove from dashboard

When owner address is different from connected wallet:
- Can only remove from dashboard
- Cannot modify or revoke allowance (read-only mode)
- Useful for monitoring other addresses' allowances


## 🛠 Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Web3**: Wagmi + Ethers.js
- **Backend**: Laravel
- **Database**: SQLite

## 🚀 Quick Start

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

## 📁 Project Structure

### Key Files
- `resources/js/Pages/` 
  - `Home.tsx` - Landing page
  - `Overview.tsx` - Dashboard with allowances list
  - `AddAllowance.tsx` - Form to add new allowances
- `resources/js/Components/` - React components
- `resources/js/hooks/useERC20.tsx` - Web3 interactions
- `resources/js/bootstrap.ts` - Holesky network configuration
- `routes/web.php` - Application routes
- `resources/css/app.css` - Global styles and TailwindCSS
- `.env` - environment variables (nothing congidential in it)

## 🎨 Design

- Primary Color: #FF5500 (Kiln Orange)
- Modern, clean interface
- Responsive design
- Real-time updates

## 📄 License

[MIT License](LICENSE)
