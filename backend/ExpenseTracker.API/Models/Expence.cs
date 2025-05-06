namespace ExpenseTracker.API.Models;

public class Expense
{
    public int ID { get; set; }
    public string Description { get; set; } = null!;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Category { get; set; } = null!;
}

