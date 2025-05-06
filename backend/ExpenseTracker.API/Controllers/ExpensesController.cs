using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly ExpenseContext _context;

    public ExpensesController(ExpenseContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> Get() =>
        await _context.Expenses.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Expense>> Get(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        return expense is null ? NotFound() : expense;
    }

    [HttpPost]
    public async Task<ActionResult<Expense>> Post([FromBody] Expense expense)
    {
        if (expense == null)
            return BadRequest("Expense is null");

        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = expense.ID }, expense);
    }

    [HttpPut("{id}")]
    [HttpPut("{id}")]
public async Task<IActionResult> Put(int id, Expense expense)
{
    if (id != expense.ID) return BadRequest();
    _context.Entry(expense).State = EntityState.Modified;
    await _context.SaveChangesAsync();
    return NoContent();
}


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        if (expense == null)
            return NotFound();

        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
