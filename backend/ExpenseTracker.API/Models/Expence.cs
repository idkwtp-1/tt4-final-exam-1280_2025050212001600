namespace ExpenseTracker.API.Models;

public class Expense
{
    public int ID { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Category { get; set; } = string.Empty;
}
