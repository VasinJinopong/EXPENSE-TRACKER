# 💰 Personal Expense Tracker

#### Mention: This application was build by using Claude Code and designed by the creater

A modern, user-friendly expense tracking application built with Next.js 15 and Thai language support. Manage your income and expenses effortlessly with intuitive design and powerful features.

## 📸 Screenshots

### Main Dashboard
![Main Dashboard](images/CleanShot%202568-08-12%20at%2020.08.30@2x.png)
*The main interface showing transaction summary, date filters, and transaction list*

### Add Transaction Form
![Add Transaction Form](images/CleanShot%202568-08-12%20at%2020.09.09@2x.png)
*User-friendly modal form for adding new income or expense transactions*

## 🌟 Key Features

### 📊 **Smart Financial Management**
- **Real-time Summary**: Instantly see your total income, expenses, and net balance
- **Category Organization**: Pre-built categories with custom icons and colors
- **Date Filtering**: View transactions by today, week, month, or all time
- **Thai Currency Support**: Formatted in Thai Baht (THB) with proper localization

### 🎯 **User-Friendly Interface**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices  
- **Dark Mode Support**: Automatic theme switching based on system preference
- **Modal Forms**: Clean, intuitive forms for adding and editing transactions
- **Visual Categories**: Easy-to-identify expense categories with emoji icons

### 💾 **Data Management**
- **Local Storage**: Your data stays on your device with automatic backup
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Real-time Updates**: Changes reflect immediately across the interface
- **Data Persistence**: Never lose your financial records

## 🎯 Benefits for Users

### **Personal Finance Control**
- **Track Every Expense**: Never wonder where your money went
- **Budget Awareness**: See spending patterns and make informed decisions  
- **Goal Setting**: Monitor progress toward financial objectives
- **Receipt-Free**: Digital alternative to keeping physical receipts

### **Time Saving**
- **Quick Entry**: Add transactions in seconds with pre-defined categories
- **Auto Calculations**: Automatic summary calculations save mental math
- **Instant Reports**: No need to manually calculate monthly totals
- **Search & Filter**: Find specific transactions quickly

### **Financial Insights**
- **Spending Patterns**: Identify where most money is spent
- **Income Tracking**: Monitor all revenue sources
- **Trend Analysis**: Compare spending across different time periods
- **Category Breakdown**: See percentage distribution of expenses

### **Privacy & Security**
- **Local Data**: All information stored on your device only
- **No Registration**: Start using immediately without accounts
- **Offline Capable**: Works without internet connection
- **Data Control**: You own and control your financial data

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VasinJinopong/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 🛠️ Technical Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with PostCSS
- **State Management**: React Context API with useReducer
- **Data Storage**: localStorage for client-side persistence
- **UI/UX**: Responsive design with dark mode support
- **Localization**: Thai language with THB currency formatting

## 📱 How to Use

### Adding Transactions
1. Click "เพิ่มรายการใหม่" (Add New Transaction)
2. Choose transaction type: Income (รายรับ) or Expense (รายจ่าย)
3. Select a category or create a new one
4. Enter amount and description
5. Set the date (defaults to today)
6. Save the transaction

### Managing Categories
- Each category has an icon, name, color, and type
- Categories help organize and visualize spending patterns
- Create custom categories for your specific needs

### Viewing Reports
- Use date filters to focus on specific time periods
- Summary card shows totals and net amount
- Transaction list displays all entries with category details

## 🎨 Customization

The app supports easy customization:
- **Categories**: Add custom expense/income categories
- **Colors**: Modify category colors in the category picker
- **Locale**: Currently supports Thai (THB), easily extensible
- **Themes**: Built-in dark/light mode support

## 📈 Future Enhancements

- **Export Features**: CSV/PDF export functionality
- **Budget Planning**: Set and track budget limits
- **Charts & Analytics**: Visual spending analytics
- **Multi-currency**: Support for multiple currencies
- **Cloud Sync**: Optional cloud backup and sync

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created by [VasinJinopong](https://github.com/VasinJinopong)

---

**Start taking control of your finances today! 💪**