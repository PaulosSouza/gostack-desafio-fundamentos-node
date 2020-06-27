import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance | null {
    const totalIncome = this.transactions.reduce(
      (sumIncome: number, currenteTransaction: Transaction) => {
        return currenteTransaction.type === 'income'
          ? currenteTransaction.value + sumIncome
          : sumIncome;
      },
      0,
    );

    const totalOutcome = this.transactions.reduce(
      (sumOutcome: number, cuurentTransaction: Transaction) => {
        return cuurentTransaction.type === 'outcome'
          ? cuurentTransaction.value + sumOutcome
          : sumOutcome;
      },
      0,
    );

    const totalBalance = totalIncome - totalOutcome;

    return totalBalance
      ? {
          income: totalIncome,
          outcome: totalOutcome,
          total: totalBalance,
        }
      : null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
